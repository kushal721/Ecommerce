export const initialState = { cart: [], saved: [], orders: [] };

export const MAX_QTY = 20;

const clampQty = (qty) => Math.max(0, Math.min(MAX_QTY, Math.floor(qty)));

export function storeReducer(state, action) {
  switch (action.type) {
    case "cart/add": {
      const existing = state.cart.find((line) => line.slug === action.slug);
      const qty = action.qty ?? 1;
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((line) =>
            line.slug === action.slug ? { ...line, qty: clampQty(line.qty + qty) } : line
          ),
        };
      }
      return { ...state, cart: [...state.cart, { slug: action.slug, qty: clampQty(qty) }] };
    }
    case "cart/set": {
      const qty = clampQty(action.qty);
      if (qty === 0) return { ...state, cart: state.cart.filter((l) => l.slug !== action.slug) };
      return {
        ...state,
        cart: state.cart.map((line) => (line.slug === action.slug ? { ...line, qty } : line)),
      };
    }
    case "cart/remove":
      return { ...state, cart: state.cart.filter((line) => line.slug !== action.slug) };
    case "saved/toggle":
      return {
        ...state,
        saved: state.saved.includes(action.slug)
          ? state.saved.filter((s) => s !== action.slug)
          : [action.slug, ...state.saved],
      };
    case "order/place":
      return { ...state, cart: [], orders: [action.order, ...state.orders] };
    default:
      return state;
  }
}
