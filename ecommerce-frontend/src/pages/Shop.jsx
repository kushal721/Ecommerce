import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import Icon from "../components/Icon";
import ProductGrid from "../components/ProductGrid";
import { DEPARTMENTS, filterProducts, getDepartment, MAX_PRICE, SORTS } from "../lib/catalog";
import { useDialog, useDocumentTitle } from "../lib/hooks";
import NotFound from "./NotFound";

export default function Shop() {
  const { department: departmentId } = useParams();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const department = departmentId ? getDepartment(departmentId) : null;

  useDocumentTitle(department ? department.name : departmentId ? "Not found" : "Shop all");

  if (departmentId && !department) return <NotFound />;

  const query = params.get("q") || "";
  const sort = params.get("sort") || "featured";
  const maxPrice = Number(params.get("max")) || MAX_PRICE;
  const inStockOnly = params.get("stock") === "1";
  const minRating = Number(params.get("rating")) || 0;

  const results = filterProducts({
    department: department?.id,
    query,
    sort,
    maxPrice,
    inStockOnly,
    minRating,
  });

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === "" || value == null || value === false) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const activeFilters = Boolean(query || maxPrice < MAX_PRICE || inStockOnly || minRating);
  const clearAll = () => setParams(sort === "featured" ? {} : { sort }, { replace: true });

  const filters = (
    <Filters
      department={department}
      params={params}
      maxPrice={maxPrice}
      inStockOnly={inStockOnly}
      minRating={minRating}
      update={update}
      clearAll={clearAll}
      activeFilters={activeFilters}
    />
  );

  return (
    <div className="page shop">
      <header className="shop-head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          {department ? <Link to="/shop">Shop</Link> : <span>Shop</span>}
          {department && (
            <>
              <span aria-hidden="true">/</span>
              <span>{department.name}</span>
            </>
          )}
        </nav>
        <h1>{department ? department.name : "Everything on the shelves"}</h1>
        <p className="shop-blurb">
          {department
            ? department.blurb
            : "All four aisles in one place. Filter by price, rating or what is in stock right now."}
        </p>
      </header>

      <div className="shop-body">
        <aside className="shop-filters" aria-label="Filters">
          {filters}
        </aside>

        <section className="shop-results" aria-label="Products">
          <div className="toolbar">
            <p className="toolbar-count" aria-live="polite">
              {results.length} {results.length === 1 ? "product" : "products"}
              {query && (
                <>
                  {" "}
                  for <strong>"{query}"</strong>
                </>
              )}
            </p>
            <button type="button" className="btn btn-quiet toolbar-filter" onClick={() => setFiltersOpen(true)}>
              <Icon name="sliders" size={18} /> Filters
            </button>
            <label className="toolbar-sort">
              <span>Sort</span>
              <select className="select" value={sort} onChange={(e) => update("sort", e.target.value === "featured" ? "" : e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {results.length > 0 ? (
            <ProductGrid products={results} columns={3} />
          ) : (
            <div className="empty">
              <Icon name="search" size={32} />
              <h2>Nothing matches those filters</h2>
              <p>Try a wider price range or a different word.</p>
              <button type="button" className="btn btn-outline" onClick={clearAll}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      <FilterSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} count={results.length}>
        {filters}
      </FilterSheet>
    </div>
  );
}

function Filters({ department, params, maxPrice, inStockOnly, minRating, update, clearAll, activeFilters }) {
  const keep = params.toString() ? `?${params.toString()}` : "";
  return (
    <div className="filters">
      <fieldset>
        <legend>Aisle</legend>
        <ul className="filter-aisles">
          <li>
            <Link to={`/shop${keep}`} className={!department ? "is-active" : ""}>
              All aisles
            </Link>
          </li>
          {DEPARTMENTS.map((d) => (
            <li key={d.id}>
              <Link to={`/shop/${d.id}${keep}`} className={department?.id === d.id ? "is-active" : ""}>
                {d.name}
              </Link>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend>Search within</legend>
        <input
          className="input"
          type="search"
          placeholder="e.g. pepper"
          defaultValue={params.get("q") || ""}
          key={params.get("q") || ""}
          onKeyDown={(e) => e.key === "Enter" && update("q", e.currentTarget.value.trim())}
          onBlur={(e) => update("q", e.currentTarget.value.trim())}
          aria-label="Search within results"
        />
      </fieldset>

      <fieldset>
        <legend>
          Price up to <strong>${maxPrice}</strong>
        </legend>
        <input
          className="range"
          type="range"
          min="1"
          max={MAX_PRICE}
          value={maxPrice}
          onChange={(e) => update("max", Number(e.target.value) >= MAX_PRICE ? "" : e.target.value)}
          aria-label="Maximum price"
        />
        <div className="range-ends">
          <span>$1</span>
          <span>${MAX_PRICE}</span>
        </div>
      </fieldset>

      <fieldset>
        <legend>Show</legend>
        <label className="check">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => update("stock", e.target.checked ? "1" : "")} />
          In stock now
        </label>
        <label className="check">
          <input type="checkbox" checked={minRating >= 4} onChange={(e) => update("rating", e.target.checked ? "4" : "")} />
          Rated 4 and up
        </label>
      </fieldset>

      {activeFilters && (
        <button type="button" className="filters-clear" onClick={clearAll}>
          Clear all filters
        </button>
      )}
    </div>
  );
}

function FilterSheet({ open, onClose, count, children }) {
  const panelRef = useDialog(open, onClose);
  return (
    <div className={`sheet-root sheet-filters ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="scrim" onClick={onClose} />
      <div ref={panelRef} className="sheet sheet-bottom" role="dialog" aria-modal="true" aria-label="Filters" inert={!open || undefined}>
        <div className="sheet-head">
          <h2>Filters</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close filters">
            <Icon name="close" />
          </button>
        </div>
        <div className="sheet-scroll">{children}</div>
        <div className="sheet-foot">
          <button type="button" className="btn btn-ink btn-block" onClick={onClose}>
            Show {count} {count === 1 ? "product" : "products"}
          </button>
        </div>
      </div>
    </div>
  );
}
