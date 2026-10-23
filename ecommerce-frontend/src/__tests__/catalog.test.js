import { describe, expect, it } from "vitest";
import { ALL_PRODUCTS, filterProducts, getProduct, priceOf, relatedProducts, searchProducts } from "../lib/catalog";

describe("catalog", () => {
  it("gives every product a unique slug", () => {
    const slugs = new Set(ALL_PRODUCTS.map((p) => p.slug));
    expect(slugs.size).toBe(ALL_PRODUCTS.length);
  });

  it("only discounts products with a 10% or larger markdown", () => {
    const cucumber = getProduct("cucumber");
    expect(priceOf(cucumber)).toBe(cucumber.price);
    const kiwi = getProduct("kiwi");
    expect(priceOf(kiwi)).toBeLessThan(kiwi.price);
  });

  it("filters by department, price and sorts ascending", () => {
    const results = filterProducts({ department: "kitchen", maxPrice: 10, sort: "price-asc" });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.department === "kitchen" && priceOf(p) <= 10)).toBe(true);
    const prices = results.map(priceOf);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("matches every word of a search", () => {
    expect(searchProducts("green pepper").map((p) => p.slug)).toEqual(["green-bell-pepper", "green-chili-pepper"]);
  });

  it("suggests related items from the same aisle", () => {
    const apple = getProduct("apple");
    const related = relatedProducts(apple);
    expect(related).not.toContain(apple);
    expect(related.every((p) => p.department === apple.department)).toBe(true);
  });
});
