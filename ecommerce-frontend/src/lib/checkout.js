import { roundMoney } from "./money";

export const FREE_SHIPPING_FROM = 60;

export const SHIPPING_METHODS = [
  { id: "standard", name: "Standard", detail: "Next morning, 8am to noon", price: 5.99 },
  { id: "express", name: "Same day", detail: "Within 3 hours of ordering", price: 12 },
];

export const PROMO_CODES = {
  FIRST20: { label: "$20 off orders over $60", minimum: 60, apply: () => 20 },
  LARDER10: { label: "10% off everything", minimum: 0, apply: (subtotal) => subtotal * 0.1 },
};

export function findPromo(code) {
  const key = code.trim().toUpperCase();
  return PROMO_CODES[key] ? { code: key, ...PROMO_CODES[key] } : null;
}

export function shippingCost(subtotal, methodId) {
  const method = SHIPPING_METHODS.find((m) => m.id === methodId) || SHIPPING_METHODS[0];
  if (method.id === "standard" && subtotal >= FREE_SHIPPING_FROM) return 0;
  return method.price;
}

export function computeTotals({ subtotal, methodId = "standard", promoCode = "" }) {
  const promo = promoCode ? findPromo(promoCode) : null;
  const promoValid = Boolean(promo && subtotal >= promo.minimum);
  const discount = promoValid ? roundMoney(Math.min(promo.apply(subtotal), subtotal)) : 0;
  const shipping = subtotal === 0 ? 0 : shippingCost(subtotal, methodId);
  return {
    subtotal: roundMoney(subtotal),
    discount,
    shipping,
    total: roundMoney(subtotal - discount + shipping),
    promo: promoValid ? promo : null,
    promoError: promo && !promoValid ? `This code needs a subtotal of $${promo.minimum} or more.` : null,
  };
}

// The next six delivery days, starting tomorrow.
export function deliveryDays(from = new Date(), count = 6) {
  return Array.from({ length: count }, (_, i) => {
    const day = new Date(from);
    day.setDate(day.getDate() + i + 1);
    return {
      id: day.toISOString().slice(0, 10),
      weekday: day.toLocaleDateString("en-US", { weekday: "short" }),
      date: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  });
}

export function makeOrderId(now = Date.now()) {
  return "LD-" + now.toString(36).toUpperCase().slice(-6);
}
