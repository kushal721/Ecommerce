import { Link, useParams } from "react-router";
import Icon from "../components/Icon";
import OrderSummary from "../components/OrderSummary";
import { SHIPPING_METHODS } from "../lib/checkout";
import { useDocumentTitle } from "../lib/hooks";
import { formatMoney } from "../lib/money";
import { useStore } from "../store/StoreProvider";
import NotFound from "./NotFound";

export function formatDay(id) {
  return new Date(`${id}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function Order() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);
  useDocumentTitle(order ? `Order ${order.id}` : "Order not found");
  if (!order) return <NotFound />;

  const method = SHIPPING_METHODS.find((m) => m.id === order.method);
  const firstName = order.contact.name.split(" ")[0];

  return (
    <div className="page order-page">
      <header className="order-head">
        <span className="order-check">
          <Icon name="check" size={28} />
        </span>
        <p className="eyebrow">Order {order.id}</p>
        <h1>Thanks, {firstName}. Your order is in.</h1>
        <p className="order-lede">
          {method.id === "express"
            ? "Same day delivery, so expect the van within three hours."
            : `Arriving ${formatDay(order.deliveryDay)}, between 8am and noon.`}{" "}
          A receipt is on its way to {order.contact.email}.
        </p>
      </header>

      <div className="split">
        <section>
          <h2 className="sub-title">Items</h2>
          <ul className="mini-lines order-lines">
            {order.items.map((item) => (
              <li key={item.slug}>
                <Link to={`/product/${item.slug}`} className={`mini-thumb tint-${item.department}`}>
                  <img src={item.thumbnail} alt="" />
                  <span className="mini-qty">{item.qty}</span>
                </Link>
                <Link to={`/product/${item.slug}`} className="mini-name">
                  {item.title}
                </Link>
                <span>{formatMoney(item.total)}</span>
              </li>
            ))}
          </ul>
        </section>
        <aside className="panel">
          <h2>Delivering to</h2>
          <address className="order-address">
            {order.contact.name}
            <br />
            {order.contact.address}
            <br />
            {order.contact.city} {order.contact.postcode}
            <br />
            {order.contact.phone}
          </address>
          <OrderSummary totals={order.totals} />
          <Link to="/shop" className="btn btn-outline btn-block">
            Keep shopping
          </Link>
          <Link to="/orders" className="drawer-link">
            All orders
          </Link>
        </aside>
      </div>
    </div>
  );
}
