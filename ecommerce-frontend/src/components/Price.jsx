import { isOnSale, priceOf } from "../lib/catalog";
import { formatMoney } from "../lib/money";

export default function Price({ product, size = "m" }) {
  const sale = isOnSale(product);
  return (
    <span className={`price price-${size}`}>
      <span className={sale ? "price-now is-sale" : "price-now"}>{formatMoney(priceOf(product))}</span>
      {sale && (
        <s className="price-was">
          <span className="sr-only">was </span>
          {formatMoney(product.price)}
        </s>
      )}
    </span>
  );
}
