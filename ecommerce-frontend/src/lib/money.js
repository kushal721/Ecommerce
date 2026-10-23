const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatMoney(amount) {
  return formatter.format(amount);
}

export function roundMoney(amount) {
  return Math.round(amount * 100) / 100;
}
