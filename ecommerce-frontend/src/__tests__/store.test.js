import { describe, expect, it } from "vitest";
import { initialState, MAX_QTY, storeReducer } from "../store/reducer";

const run = (...actions) => actions.reduce(storeReducer, initialState);

describe("cart", () => {
  it("adds a new line and merges repeat adds", () => {
    const state = run({ type: "cart/add", slug: "apple" }, { type: "cart/add", slug: "apple", qty: 2 });
    expect(state.cart).toEqual([{ slug: "apple", qty: 3 }]);
  });

  it("caps quantity at the maximum", () => {
    const state = run({ type: "cart/add", slug: "apple", qty: 50 });
    expect(state.cart[0].qty).toBe(MAX_QTY);
  });

  it("removes a line when quantity is set to zero", () => {
    const state = run({ type: "cart/add", slug: "apple" }, { type: "cart/set", slug: "apple", qty: 0 });
    expect(state.cart).toEqual([]);
  });

  it("empties the cart and records the order when one is placed", () => {
    const state = run({ type: "cart/add", slug: "apple" }, { type: "order/place", order: { id: "LD-1" } });
    expect(state.cart).toEqual([]);
    expect(state.orders.map((o) => o.id)).toEqual(["LD-1"]);
  });
});

describe("saved", () => {
  it("toggles a product in and out", () => {
    const once = run({ type: "saved/toggle", slug: "kiwi" });
    expect(once.saved).toEqual(["kiwi"]);
    expect(storeReducer(once, { type: "saved/toggle", slug: "kiwi" }).saved).toEqual([]);
  });
});
