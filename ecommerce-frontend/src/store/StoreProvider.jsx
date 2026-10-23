import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getProduct, priceOf } from "../lib/catalog";
import { roundMoney } from "../lib/money";
import { initialState, storeReducer } from "./reducer";

const STORAGE_KEY = "larder:v1";
const StoreContext = createContext(null);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return {
      cart: (parsed.cart || []).filter((line) => getProduct(line.slug)),
      saved: (parsed.saved || []).filter((slug) => getProduct(slug)),
      orders: parsed.orders || [],
    };
  } catch {
    return initialState;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, undefined, loadState);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Private mode or full storage: the store still works for this visit.
    }
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const lines = useMemo(
    () =>
      state.cart.map((line) => {
        const product = getProduct(line.slug);
        const unit = priceOf(product);
        return { ...line, product, unit, total: roundMoney(unit * line.qty) };
      }),
    [state.cart]
  );

  const addToCart = useCallback((slug, qty = 1) => {
    dispatch({ type: "cart/add", slug, qty });
    setToast({ id: Date.now(), slug, qty });
  }, []);

  const value = useMemo(
    () => ({
      lines,
      itemCount: lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal: roundMoney(lines.reduce((sum, l) => sum + l.total, 0)),
      qtyInCart: (slug) => state.cart.find((l) => l.slug === slug)?.qty || 0,
      saved: state.saved,
      isSaved: (slug) => state.saved.includes(slug),
      orders: state.orders,
      addToCart,
      setQty: (slug, qty) => dispatch({ type: "cart/set", slug, qty }),
      removeFromCart: (slug) => dispatch({ type: "cart/remove", slug }),
      toggleSaved: (slug) => dispatch({ type: "saved/toggle", slug }),
      placeOrder: (order) => dispatch({ type: "order/place", order }),
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
      toast,
      dismissToast: () => setToast(null),
    }),
    [lines, state, addToCart, cartOpen, searchOpen, toast]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider");
  return store;
}
