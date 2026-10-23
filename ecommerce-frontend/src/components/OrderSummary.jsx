import { formatMoney } from "../lib/money";

export default function OrderSummary({ totals }) {
  return (
    <dl className="summary">
      <div>
        <dt>Subtotal</dt>
        <dd>{formatMoney(totals.subtotal)}</dd>
      </div>
      {totals.discount > 0 && (
        <div className="summary-discount">
          <dt>Promo {totals.promo?.code}</dt>
          <dd>-{formatMoney(totals.discount)}</dd>
        </div>
      )}
      <div>
        <dt>Delivery</dt>
        <dd>{totals.shipping === 0 ? "Free" : formatMoney(totals.shipping)}</dd>
      </div>
      <div className="summary-total">
        <dt>Total</dt>
        <dd>{formatMoney(totals.total)}</dd>
      </div>
    </dl>
  );
}
