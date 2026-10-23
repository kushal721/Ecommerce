import { Link } from "react-router";
import CartLines from "../components/CartLines";
import Icon from "../components/Icon";
import OrderSummary from "../components/OrderSummary";
import ProductGrid from "../components/ProductGrid";
import ShippingMeter from "../components/ShippingMeter";
import { filterProducts } from "../lib/catalog";
import { computeTotals } from "../lib/checkout";
import { useDocumentTitle } from "../lib/hooks";
import { useStore } from "../store/StoreProvider";

export default function Cart() {
  const { lines, subtotal, itemCount } = useStore();
  useDocumentTitle("Bag");
  const totals = computeTotals({ subtotal });

  if (lines.length === 0) {
    const ideas = filterProducts({ department: "fresh", sort: "rating" }).slice(0, 4);
    return (
      <div className="page narrow-page">
        <div className="empty">
          <Icon name="bag" size={36} />
          <h1>Your bag is empty</h1>
          <p>Fresh picks to get you started are below.</p>
          <Link to="/shop" className="btn btn-primary">
            Start shopping
          </Link>
        </div>
        <ProductGrid products={ideas} />
      </div>
    );
  }

  return (
    <div className="page bag-page">
      <h1 className="page-title">
        Your bag <span>{itemCount} items</span>
      </h1>
      <div className="split">
        <div>
          <ShippingMeter subtotal={subtotal} />
          <CartLines />
        </div>
        <aside className="panel">
          <h2>Summary</h2>
          <OrderSummary totals={totals} />
          <p className="panel-hint">Promo codes and same day delivery are on the next page.</p>
          <Link to="/checkout" className="btn btn-primary btn-block">
            Checkout
          </Link>
          <Link to="/shop" className="drawer-link">
            Keep shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
