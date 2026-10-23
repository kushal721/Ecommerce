import { FREE_SHIPPING_FROM } from "../lib/checkout";
import { formatMoney } from "../lib/money";
import Icon from "./Icon";

export default function ShippingMeter({ subtotal }) {
  const remaining = FREE_SHIPPING_FROM - subtotal;
  const progress = Math.min(subtotal / FREE_SHIPPING_FROM, 1);
  return (
    <div className="meter">
      <p>
        <Icon name="truck" size={18} />
        {remaining > 0 ? (
          <span>
            Add <strong>{formatMoney(remaining)}</strong> more for free delivery
          </span>
        ) : (
          <span>Free next morning delivery is on us</span>
        )}
      </p>
      <div className="meter-track" aria-hidden="true">
        <div className="meter-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </div>
  );
}
