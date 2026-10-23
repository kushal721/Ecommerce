import { Link } from "react-router";
import { isOnSale } from "../lib/catalog";
import { useStore } from "../store/StoreProvider";
import Icon from "./Icon";
import Price from "./Price";
import QuantityStepper from "./QuantityStepper";

export default function ProductCard({ product }) {
  const { addToCart, qtyInCart, setQty, isSaved, toggleSaved } = useStore();
  const qty = qtyInCart(product.slug);
  const saved = isSaved(product.slug);

  return (
    <article className="card">
      <Link to={`/product/${product.slug}`} className={`card-media tint-${product.department}`}>
        <img src={product.thumbnail} alt="" loading="lazy" width="300" height="300" />
        {isOnSale(product) && <span className="card-tag">{product.discount}% off</span>}
      </Link>
      <button
        type="button"
        className={`card-save ${saved ? "is-saved" : ""}`}
        onClick={() => toggleSaved(product.slug)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.title} from saved` : `Save ${product.title}`}
      >
        <Icon name="heart" size={18} filled={saved} />
      </button>
      <div className="card-body">
        <Link to={`/product/${product.slug}`} className="card-title">
          {product.title}
        </Link>
        <div className="card-row">
          <Price product={product} />
          {qty > 0 ? (
            <QuantityStepper
              size="s"
              min={0}
              value={qty}
              onChange={(next) => setQty(product.slug, next)}
              label={`${product.title} in bag`}
            />
          ) : (
            <button
              type="button"
              className="card-add"
              onClick={() => addToCart(product.slug)}
              aria-label={`Add ${product.title} to bag`}
            >
              <Icon name="plus" size={18} />
            </button>
          )}
        </div>
        {product.stock < 10 && <p className="card-note">Only {product.stock} left</p>}
      </div>
    </article>
  );
}
