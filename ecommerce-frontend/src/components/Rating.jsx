import Icon from "./Icon";

export default function Rating({ value, count }) {
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      <span className="rating-stars" aria-hidden="true">
        <span className="rating-base">
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" size={15} />
          ))}
        </span>
        <span className="rating-fill" style={{ width: `${(value / 5) * 100}%` }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" size={15} filled />
          ))}
        </span>
      </span>
      <span className="rating-value">{value.toFixed(1)}</span>
      {count != null && <span className="rating-count">({count})</span>}
    </span>
  );
}
