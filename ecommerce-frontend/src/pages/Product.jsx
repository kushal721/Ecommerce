import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Icon from "../components/Icon";
import Price from "../components/Price";
import ProductGrid from "../components/ProductGrid";
import QuantityStepper from "../components/QuantityStepper";
import Rating from "../components/Rating";
import { getDepartment, getProduct, isOnSale, priceOf, relatedProducts } from "../lib/catalog";
import { useDocumentTitle } from "../lib/hooks";
import { formatMoney } from "../lib/money";
import { useStore } from "../store/StoreProvider";
import NotFound from "./NotFound";

export default function Product() {
  const { slug } = useParams();
  const product = getProduct(slug);
  useDocumentTitle(product?.title || "Not found");
  if (!product) return <NotFound />;
  // Keyed so gallery and quantity reset when moving between products.
  return <ProductView key={product.slug} product={product} />;
}

function ProductView({ product }) {
  const { addToCart, qtyInCart, isSaved, toggleSaved } = useStore();
  const [image, setImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const department = getDepartment(product.department);
  const inBag = qtyInCart(product.slug);
  const saved = isSaved(product.slug);
  const related = relatedProducts(product);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1600);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const add = () => {
    addToCart(product.slug, qty);
    setJustAdded(true);
  };

  const details = [
    ["Item code", product.sku],
    ["Weight", `${product.weight} kg`],
    ["Warranty", product.warranty],
  ];

  return (
    <div className="page pdp">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/shop/${department.id}`}>{department.name}</Link>
        <span aria-hidden="true">/</span>
        <span>{product.title}</span>
      </nav>

      <div className="pdp-main">
        <div className="gallery">
          <div className={`gallery-stage tint-${product.department}`}>
            <img key={image} src={product.images[image]} alt={product.title} width="1000" height="1000" />
            {isOnSale(product) && <span className="card-tag">{product.discount}% off</span>}
            {product.images.length > 1 && (
              <div className="gallery-nav">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setImage((i) => (i - 1 + product.images.length) % product.images.length)}
                  aria-label="Previous image"
                >
                  <Icon name="chevronLeft" />
                </button>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setImage((i) => (i + 1) % product.images.length)}
                  aria-label="Next image"
                >
                  <Icon name="chevronRight" />
                </button>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="gallery-thumbs">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  className={`tint-${product.department} ${index === image ? "is-active" : ""}`}
                  onClick={() => setImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={index === image}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp-info">
          <p className="eyebrow">{department.name}</p>
          <h1>{product.title}</h1>
          <Rating value={product.rating} count={product.reviews.length} />
          <Price product={product} size="l" />
          <p className="pdp-desc">{product.description}</p>

          <p className={`stock ${product.stock < 10 ? "is-low" : ""}`}>
            <span className="stock-dot" aria-hidden="true" />
            {product.stock < 10 ? `Only ${product.stock} left` : "In stock, ready to pack"}
          </p>

          <div className="buy">
            <QuantityStepper value={qty} onChange={setQty} />
            <button type="button" className={`btn btn-primary buy-add ${justAdded ? "is-done" : ""}`} onClick={add}>
              {justAdded ? (
                <>
                  <Icon name="check" size={18} /> Added
                </>
              ) : (
                <>Add to bag, {formatMoney(priceOf(product) * qty)}</>
              )}
            </button>
            <button
              type="button"
              className={`icon-btn buy-save ${saved ? "is-saved" : ""}`}
              onClick={() => toggleSaved(product.slug)}
              aria-pressed={saved}
              aria-label={saved ? "Remove from saved" : "Save for later"}
            >
              <Icon name="heart" filled={saved} />
            </button>
          </div>
          {inBag > 0 && (
            <p className="buy-note">
              You have {inBag} in your bag. <Link to="/cart" className="text-link">Review bag</Link>
            </p>
          )}

          <ul className="assurances">
            <li>
              <Icon name="truck" size={18} /> Free delivery on orders over $60
            </li>
            <li>
              <Icon name="returns" size={18} /> Damaged on arrival? Refunded the same day
            </li>
          </ul>

          <dl className="specs">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="reviews section">
        <div className="reviews-head">
          <h2>What buyers said</h2>
          <p className="reviews-score">
            <span>{product.rating.toFixed(1)}</span> out of 5 from {product.reviews.length} reviews
          </p>
        </div>
        <ul className="reviews-list">
          {product.reviews.map((review) => (
            <li key={review.name + review.date}>
              <Rating value={review.rating} />
              <p className="review-text">{review.comment}</p>
              <p className="review-meta">
                {review.name},{" "}
                {new Date(review.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>Also in {department.name}</h2>
            <Link to={`/shop/${department.id}`} className="text-link">
              See the aisle
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
