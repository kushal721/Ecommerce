import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import Icon from "../components/Icon";
import OrderSummary from "../components/OrderSummary";
import { computeTotals, deliveryDays, findPromo, makeOrderId, SHIPPING_METHODS, shippingCost } from "../lib/checkout";
import { useDocumentTitle } from "../lib/hooks";
import { formatMoney } from "../lib/money";
import { useStore } from "../store/StoreProvider";

const FIELDS = [
  { name: "email", label: "Email", type: "email", autoComplete: "email", wide: true },
  { name: "name", label: "Full name", autoComplete: "name", wide: true },
  { name: "address", label: "Street address", autoComplete: "street-address", wide: true },
  { name: "city", label: "City", autoComplete: "address-level2" },
  { name: "postcode", label: "Postcode", autoComplete: "postal-code" },
  { name: "phone", label: "Phone, for the driver", type: "tel", autoComplete: "tel", wide: true },
];

function validate(form) {
  const errors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errors.email = "Enter an email we can send the receipt to.";
  if (form.name.trim().length < 2) errors.name = "Who should the driver ask for?";
  if (form.address.trim().length < 5) errors.address = "Add a street and house number.";
  if (!form.city.trim()) errors.city = "Add a city.";
  if (!/^[A-Za-z0-9 -]{3,10}$/.test(form.postcode.trim())) errors.postcode = "That postcode looks wrong.";
  if (form.phone.replace(/\D/g, "").length < 7) errors.phone = "Add a number with at least 7 digits.";
  return errors;
}

export default function Checkout() {
  const { lines, subtotal, placeOrder } = useStore();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const days = useMemo(() => deliveryDays(), []);
  useDocumentTitle("Checkout");

  const [form, setForm] = useState({ email: "", name: "", address: "", city: "", postcode: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [day, setDay] = useState(days[0].id);
  const [method, setMethod] = useState("standard");
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const totals = computeTotals({ subtotal, methodId: method, promoCode });

  if (lines.length === 0) {
    return (
      <div className="page narrow-page">
        <div className="empty">
          <Icon name="bag" size={36} />
          <h1>Nothing to check out yet</h1>
          <p>Add a few things to your bag first.</p>
          <Link to="/shop" className="btn btn-primary">
            Go to the shop
          </Link>
        </div>
      </div>
    );
  }

  const change = (event) => {
    const { name, value } = event.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const applyPromo = () => {
    const promo = findPromo(promoInput);
    if (!promo) {
      setPromoCode("");
      setPromoMessage("We do not recognise that code. Try FIRST20 or LARDER10.");
      return;
    }
    setPromoCode(promo.code);
    setPromoMessage(subtotal >= promo.minimum ? `${promo.code} applied: ${promo.label}.` : "");
  };

  const submit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const id = makeOrderId();
    placeOrder({
      id,
      placedAt: new Date().toISOString(),
      deliveryDay: day,
      method,
      contact: Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()])),
      items: lines.map(({ slug, qty, unit, total, product }) => ({
        slug,
        qty,
        unit,
        total,
        title: product.title,
        thumbnail: product.thumbnail,
        department: product.department,
      })),
      totals: { ...totals, promo: totals.promo ? { code: totals.promo.code } : null, promoError: null },
    });
    navigate(`/orders/${id}`, { replace: true });
  };

  return (
    <div className="page checkout">
      <h1 className="page-title">Checkout</h1>
      <form ref={formRef} className="split" onSubmit={submit} noValidate>
        <div className="checkout-steps">
          <section className="step">
            <h2>
              <span>1</span> Where should we deliver?
            </h2>
            <div className="field-grid">
              {FIELDS.map((f) => (
                <div key={f.name} className={`field ${f.wide ? "field-wide" : ""}`}>
                  <label htmlFor={`co-${f.name}`}>{f.label}</label>
                  <input
                    id={`co-${f.name}`}
                    className="input"
                    name={f.name}
                    type={f.type || "text"}
                    autoComplete={f.autoComplete}
                    value={form[f.name]}
                    onChange={change}
                    aria-invalid={Boolean(errors[f.name])}
                    aria-describedby={errors[f.name] ? `co-${f.name}-error` : undefined}
                  />
                  {errors[f.name] && (
                    <p id={`co-${f.name}-error`} className="field-error">
                      {errors[f.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="step">
            <h2>
              <span>2</span> When?
            </h2>
            <fieldset className="day-picker">
              <legend className="sr-only">Delivery day</legend>
              {days.map((d) => (
                <label key={d.id} className={`day ${day === d.id ? "is-active" : ""}`}>
                  <input type="radio" name="day" value={d.id} checked={day === d.id} onChange={() => setDay(d.id)} />
                  <span className="day-week">{d.weekday}</span>
                  <span className="day-date">{d.date}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="methods">
              <legend className="sr-only">Delivery speed</legend>
              {SHIPPING_METHODS.map((m) => {
                const cost = shippingCost(subtotal, m.id);
                return (
                  <label key={m.id} className={`method ${method === m.id ? "is-active" : ""}`}>
                    <input type="radio" name="method" value={m.id} checked={method === m.id} onChange={() => setMethod(m.id)} />
                    <span className="method-text">
                      <strong>{m.name}</strong>
                      <span>{m.id === "express" ? m.detail : `${m.detail} on your chosen day`}</span>
                    </span>
                    <span className="method-price">{cost === 0 ? "Free" : formatMoney(cost)}</span>
                  </label>
                );
              })}
            </fieldset>
          </section>

          <section className="step">
            <h2>
              <span>3</span> Payment
            </h2>
            <div className="pay-note">
              <Icon name="box" />
              <p>
                <strong>Pay the driver on delivery.</strong> This is a demo store, so no card details are
                asked for and nothing is charged. Placing the order saves it in this browser so you can
                see the confirmation and order history.
              </p>
            </div>
          </section>
        </div>

        <aside className="panel checkout-panel">
          <h2>Your order</h2>
          <ul className="mini-lines">
            {lines.map(({ slug, qty, total, product }) => (
              <li key={slug}>
                <span className={`mini-thumb tint-${product.department}`}>
                  <img src={product.thumbnail} alt="" />
                  <span className="mini-qty">{qty}</span>
                </span>
                <span className="mini-name">{product.title}</span>
                <span>{formatMoney(total)}</span>
              </li>
            ))}
          </ul>

          <div className="promo-field">
            <label htmlFor="promo" className="sr-only">
              Promo code
            </label>
            <input
              id="promo"
              className="input"
              placeholder="Promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyPromo();
                }
              }}
            />
            <button type="button" className="btn btn-quiet" onClick={applyPromo}>
              Apply
            </button>
          </div>
          {(totals.promoError || promoMessage) && (
            <p className={totals.promoError || !totals.promo ? "field-error" : "promo-ok"}>
              {totals.promoError || promoMessage}
            </p>
          )}

          <OrderSummary totals={totals} />
          <button type="submit" className="btn btn-primary btn-block">
            Place order, {formatMoney(totals.total)}
          </button>
        </aside>
      </form>
    </div>
  );
}
