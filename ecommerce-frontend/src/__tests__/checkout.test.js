import { describe, expect, it } from "vitest";
import { computeTotals, deliveryDays, FREE_SHIPPING_FROM } from "../lib/checkout";

describe("computeTotals", () => {
  it("charges standard delivery under the free threshold", () => {
    expect(computeTotals({ subtotal: 20 })).toMatchObject({ shipping: 5.99, total: 25.99 });
  });

  it("makes standard delivery free at the threshold", () => {
    expect(computeTotals({ subtotal: FREE_SHIPPING_FROM }).shipping).toBe(0);
  });

  it("always charges for same day delivery", () => {
    expect(computeTotals({ subtotal: 100, methodId: "express" }).shipping).toBe(12);
  });

  it("applies FIRST20 only above its minimum", () => {
    expect(computeTotals({ subtotal: 80, promoCode: "first20" })).toMatchObject({ discount: 20, total: 60 });
    const short = computeTotals({ subtotal: 40, promoCode: "FIRST20" });
    expect(short.discount).toBe(0);
    expect(short.promoError).toMatch(/\$60/);
  });

  it("applies a percentage code", () => {
    expect(computeTotals({ subtotal: 45.5, promoCode: "LARDER10" }).discount).toBe(4.55);
  });

  it("ignores unknown codes", () => {
    expect(computeTotals({ subtotal: 30, promoCode: "NOPE" })).toMatchObject({ discount: 0, promo: null });
  });
});

describe("deliveryDays", () => {
  it("returns six consecutive days starting tomorrow", () => {
    const days = deliveryDays(new Date("2026-10-23T10:00:00"));
    expect(days).toHaveLength(6);
    expect(days[0].id).toBe("2026-10-24");
    expect(days[5].id).toBe("2026-10-29");
  });
});
