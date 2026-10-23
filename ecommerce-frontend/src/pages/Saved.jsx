import { Link } from "react-router";
import Icon from "../components/Icon";
import ProductGrid from "../components/ProductGrid";
import { pickProducts } from "../lib/catalog";
import { useDocumentTitle } from "../lib/hooks";
import { useStore } from "../store/StoreProvider";

export default function Saved() {
  const { saved } = useStore();
  useDocumentTitle("Saved");
  const products = pickProducts(saved);

  return (
    <div className="page narrow-page wide">
      <h1 className="page-title">
        Saved items {products.length > 0 && <span>{products.length}</span>}
      </h1>
      {products.length === 0 ? (
        <div className="empty">
          <Icon name="heart" size={36} />
          <h2>Nothing saved yet</h2>
          <p>Tap the heart on any product to keep it here for later.</p>
          <Link to="/shop" className="btn btn-primary">
            Browse the shop
          </Link>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
