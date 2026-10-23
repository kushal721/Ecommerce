import { Link } from "react-router";
import { useDialog } from "../lib/hooks";
import { formatMoney } from "../lib/money";
import { useStore } from "../store/StoreProvider";
import CartLines from "./CartLines";
import Icon from "./Icon";
import ShippingMeter from "./ShippingMeter";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, itemCount, subtotal } = useStore();
  const close = () => setCartOpen(false);
  const panelRef = useDialog(cartOpen, close);

  return (
    <div className={`sheet-root ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
      <div className="scrim" onClick={close} />
      <aside
        ref={panelRef}
        className="sheet sheet-right drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        inert={!cartOpen || undefined}
      >
        <div className="sheet-head">
          <h2>
            Your bag <span className="drawer-count">{itemCount}</span>
          </h2>
          <button type="button" className="icon-btn" onClick={close} aria-label="Close bag">
            <Icon name="close" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <Icon name="bag" size={36} />
            <p>Your bag is empty.</p>
            <Link to="/shop" className="btn btn-outline" onClick={close}>
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ShippingMeter subtotal={subtotal} />
            <div className="drawer-scroll">
              <CartLines onNavigate={close} />
            </div>
            <div className="drawer-foot">
              <div className="drawer-total">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <p className="drawer-hint">Delivery and promo codes are worked out at checkout.</p>
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={close}>
                Checkout
              </Link>
              <Link to="/cart" className="drawer-link" onClick={close}>
                View full bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
