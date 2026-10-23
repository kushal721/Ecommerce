import { getProduct } from "../lib/catalog";
import { useStore } from "../store/StoreProvider";
import Icon from "./Icon";

export default function Toast() {
  const { toast, dismissToast, setCartOpen, cartOpen } = useStore();
  const product = toast && getProduct(toast.slug);
  const visible = Boolean(product) && !cartOpen;

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {visible && (
        <div className="toast" key={toast.id}>
          <span className={`toast-thumb tint-${product.department}`}>
            <img src={product.thumbnail} alt="" />
          </span>
          <p>
            <strong>{product.title}</strong> is in your bag
          </p>
          <button
            type="button"
            className="btn btn-ink toast-btn"
            onClick={() => {
              dismissToast();
              setCartOpen(true);
            }}
          >
            View bag
          </button>
          <button type="button" className="icon-btn" onClick={dismissToast} aria-label="Dismiss">
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
