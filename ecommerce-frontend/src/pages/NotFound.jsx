import { Link } from "react-router";
import { useDocumentTitle } from "../lib/hooks";

export default function NotFound() {
  useDocumentTitle("Not found");
  return (
    <div className="page narrow-page">
      <div className="empty not-found">
        <p className="not-found-code">404</p>
        <h1>This shelf is empty</h1>
        <p>The page you followed has moved or never existed.</p>
        <Link to="/shop" className="btn btn-primary">
          Back to the shop
        </Link>
      </div>
    </div>
  );
}
