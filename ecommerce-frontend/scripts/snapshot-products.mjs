// Pulls the catalog from DummyJSON once and writes a trimmed copy to
// src/data/products.json, so the store never depends on the API at runtime.
import { writeFile } from "node:fs/promises";

const SOURCES = ["groceries", "kitchen-accessories", "home-decoration"];

const FRESH_TAGS = new Set(["fruits", "vegetables", "meat", "seafood", "dairy", "desserts"]);

function departmentFor(product) {
  if (product.category === "kitchen-accessories") return "kitchen";
  if (product.category === "home-decoration") return "home";
  return product.tags.some((tag) => FRESH_TAGS.has(tag)) ? "fresh" : "pantry";
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const products = [];
for (const category of SOURCES) {
  const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=0`);
  if (!res.ok) throw new Error(`DummyJSON returned ${res.status} for ${category}`);
  const { products: items } = await res.json();
  for (const p of items) {
    products.push({
      id: p.id,
      slug: slugify(p.title),
      title: p.title,
      description: p.description,
      department: departmentFor(p),
      tags: p.tags,
      price: p.price,
      discount: Math.round(p.discountPercentage),
      // DummyJSON's rating field disagrees with its own reviews, so derive it.
      rating: Math.round((p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length) * 10) / 10,
      stock: p.stock,
      sku: p.sku,
      weight: p.weight,
      warranty: p.warrantyInformation,
      images: p.images,
      thumbnail: p.thumbnail,
      reviews: p.reviews.map((r) => ({
        rating: r.rating,
        comment: r.comment,
        name: r.reviewerName,
        date: r.date.slice(0, 10),
      })),
    });
  }
}

await writeFile(
  new URL("../src/data/products.json", import.meta.url),
  JSON.stringify(products, null, 2) + "\n"
);
console.log(`Wrote ${products.length} products`);
