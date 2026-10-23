import ProductCard from "./ProductCard";

export default function ProductGrid({ products, columns = 4 }) {
  return (
    <ul className={`grid grid-${columns}`}>
      {products.map((product) => (
        <li key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
