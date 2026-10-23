import { Link } from "react-router";
import Icon from "../components/Icon";
import { useDocumentTitle } from "../lib/hooks";
import { formatMoney } from "../lib/money";
import { useStore } from "../store/StoreProvider";
import { formatDay } from "./Order";

export default function Orders() {
  const { orders } = useStore();
  useDocumentTitle("Orders");

  return (
    <div className="page narrow-page">
      <h1 className="page-title">Your orders</h1>
      {orders.length === 0 ? (
        <div className="empty">
          <Icon name="receipt" size={36} />
          <h2>No orders yet</h2>
          <p>Orders you place in this browser show up here.</p>
          <Link to="/shop" className="btn btn-primary">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id}>
              <Link to={`/orders/${order.id}`}>
                <span className="order-list-id">{order.id}</span>
                <span className="order-list-thumbs" aria-hidden="true">
                  {order.items.slice(0, 4).map((item) => (
                    <img key={item.slug} src={item.thumbnail} alt="" className={`tint-${item.department}`} />
                  ))}
                </span>
                <span className="order-list-meta">
                  {order.items.reduce((n, i) => n + i.qty, 0)} items, delivery {formatDay(order.deliveryDay)}
                </span>
                <strong>{formatMoney(order.totals.total)}</strong>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
