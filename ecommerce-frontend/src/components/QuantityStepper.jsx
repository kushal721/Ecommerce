import { MAX_QTY } from "../store/reducer";
import Icon from "./Icon";

export default function QuantityStepper({ value, onChange, min = 1, label = "Quantity", size = "m" }) {
  return (
    <div className={`stepper stepper-${size}`} role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={value === 1 && min === 0 ? "Remove one" : "Decrease quantity"}
      >
        <Icon name={value === 1 && min === 0 ? "trash" : "minus"} size={16} />
      </button>
      <output aria-live="polite">{value}</output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label="Increase quantity"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
