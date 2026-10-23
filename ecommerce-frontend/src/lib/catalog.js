import products from "../data/products.json";
import { roundMoney } from "./money";

export const DEPARTMENTS = [
  {
    id: "fresh",
    name: "Fresh",
    blurb: "Fruit, vegetables, meat, fish and dairy, packed the morning your order leaves.",
  },
  {
    id: "pantry",
    name: "Pantry",
    blurb: "Rice, oil, coffee, honey and the other things you run out of on a Sunday night.",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    blurb: "Pans, knives, boards and small tools that earn their drawer space.",
  },
  {
    id: "home",
    name: "Home",
    blurb: "A short list of lamps, pots and frames for the rest of the house.",
  },
];

export const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "rating", label: "Best rated" },
  { id: "discount", label: "Biggest saving" },
];

// Discounts under 10% read as noise on a price tag, so they are ignored.
const MIN_DISCOUNT = 10;

export const ALL_PRODUCTS = products;
export const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)));

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug) {
  return bySlug.get(slug);
}

export function getDepartment(id) {
  return DEPARTMENTS.find((d) => d.id === id);
}

export function productsIn(departmentId) {
  return products.filter((p) => p.department === departmentId);
}

export function isOnSale(product) {
  return product.discount >= MIN_DISCOUNT;
}

export function priceOf(product) {
  return isOnSale(product) ? roundMoney(product.price * (1 - product.discount / 100)) : product.price;
}

export function matchesQuery(product, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = [product.title, product.department, ...product.tags].join(" ").toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export function searchProducts(query, limit = 6) {
  if (!query.trim()) return [];
  return products.filter((p) => matchesQuery(p, query)).slice(0, limit);
}

const sorters = {
  featured: (a, b) => b.rating * Math.log(b.stock + 2) - a.rating * Math.log(a.stock + 2),
  "price-asc": (a, b) => priceOf(a) - priceOf(b),
  "price-desc": (a, b) => priceOf(b) - priceOf(a),
  rating: (a, b) => b.rating - a.rating,
  discount: (a, b) => (isOnSale(b) ? b.discount : 0) - (isOnSale(a) ? a.discount : 0),
};

export function filterProducts({
  department,
  query = "",
  maxPrice = Infinity,
  inStockOnly = false,
  minRating = 0,
  sort = "featured",
}) {
  return products
    .filter((p) => !department || p.department === department)
    .filter((p) => matchesQuery(p, query))
    .filter((p) => priceOf(p) <= maxPrice)
    .filter((p) => !inStockOnly || p.stock > 0)
    .filter((p) => p.rating >= minRating)
    .sort(sorters[sort] || sorters.featured);
}

export function relatedProducts(product, limit = 4) {
  const shared = (p) => p.tags.filter((t) => product.tags.includes(t)).length;
  return products
    .filter((p) => p.department === product.department && p.slug !== product.slug)
    .sort((a, b) => shared(b) - shared(a) || b.rating - a.rating)
    .slice(0, limit);
}

export function pickProducts(slugs) {
  return slugs.map(getProduct).filter(Boolean);
}
