import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DEPARTMENTS, getDepartment, pickProducts, priceOf, searchProducts } from "../lib/catalog";
import { useDialog } from "../lib/hooks";
import { formatMoney } from "../lib/money";
import { useStore } from "../store/StoreProvider";
import Icon from "./Icon";

const SUGGESTED = pickProducts(["strawberry", "carbon-steel-wok", "honey-jar", "nescafe-coffee"]);

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const close = () => setSearchOpen(false);
  const panelRef = useDialog(searchOpen, close);

  const results = query.trim() ? searchProducts(query, 7) : SUGGESTED;

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const go = (path) => {
    close();
    navigate(path);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (results[active]) go(`/product/${results[active].slug}`);
      else if (query.trim()) go(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!searchOpen) return null;

  return (
    <div className="search-root">
      <div className="scrim" onClick={close} />
      <div ref={panelRef} className="search-panel" role="dialog" aria-modal="true" aria-label="Search">
        <div className="search-field">
          <Icon name="search" />
          <input
            data-autofocus
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search lemons, woks, coffee..."
            aria-label="Search products"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `result-${results[active].slug}` : undefined}
          />
          <button type="button" className="icon-btn" onClick={close} aria-label="Close search">
            <Icon name="close" />
          </button>
        </div>

        <p className="search-label">{query.trim() ? (results.length ? "Products" : "No matches") : "Popular this week"}</p>

        {results.length > 0 ? (
          <ul id="search-results" role="listbox" className="search-results">
            {results.map((product, index) => (
              <li
                key={product.slug}
                id={`result-${product.slug}`}
                role="option"
                aria-selected={index === active}
                className={index === active ? "is-active" : ""}
                onMouseEnter={() => setActive(index)}
                onClick={() => go(`/product/${product.slug}`)}
              >
                <span className={`search-thumb tint-${product.department}`}>
                  <img src={product.thumbnail} alt="" loading="lazy" />
                </span>
                <span className="search-name">
                  {product.title}
                  <small>{getDepartment(product.department).name}</small>
                </span>
                <span className="search-price">{formatMoney(priceOf(product))}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="search-empty">
            <p>Nothing called "{query}" on the shelves. Try an aisle instead:</p>
            <div className="chip-row">
              {DEPARTMENTS.map((d) => (
                <button key={d.id} type="button" className="chip" onClick={() => go(`/shop/${d.id}`)}>
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {query.trim() && results.length > 0 && (
          <button
            type="button"
            className="search-all"
            onClick={() => go(`/shop?q=${encodeURIComponent(query.trim())}`)}
          >
            See every result for "{query.trim()}"
          </button>
        )}
      </div>
    </div>
  );
}
