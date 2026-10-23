import { Link } from "react-router";
import { formatMoney } from "../lib/money";
import { useStore } from "../store/StoreProvider";
import QuantityStepper from "./QuantityStepper";

export default function CartLines({ onNavigate }) {
  const { lines, setQty, removeFromCart } = useStore();
  return (
    <ul className="lines">
      {lines.map(({ slug, qty, product, unit, total }) => (
        <li key={slug} className="line">
          <Link to={`/product/${slug}`} onClick={onNavigate} className={`line-thumb tint-${product.department}`}>
            <img src={product.thumbnail} alt="" loading="lazy" />
          </Link>
          <div className="line-info">
            <Link to={`/product/${slug}`} onClick={onNavigate} className="line-title">
              {product.title}
            </Link>
            <span className="line-unit">{formatMoney(unit)} each</span>
            <div className="line-controls">
              <QuantityStepper
                size="s"
                value={qty}
                onChange={(next) => setQty(slug, next)}
                label={`${product.title} quantity`}
              />
              <button type="button" className="line-remove" onClick={() => removeFromCart(slug)}>
                Remove
              </button>
            </div>
          </div>
          <span className="line-total">{formatMoney(total)}</span>
        </li>
      ))}
    </ul>
  );
}
