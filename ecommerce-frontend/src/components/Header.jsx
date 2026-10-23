import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { DEPARTMENTS } from "../lib/catalog";
import { FREE_SHIPPING_FROM } from "../lib/checkout";
import { useDialog } from "../lib/hooks";
import { useStore } from "../store/StoreProvider";
import Icon from "./Icon";

const NAV = [{ to: "/shop", label: "Shop all", end: true }].concat(
  DEPARTMENTS.map((d) => ({ to: `/shop/${d.id}`, label: d.name }))
);

export default function Header() {
  const { itemCount, saved, setCartOpen, setSearchOpen } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      const typing = /input|textarea|select/i.test(event.target.tagName);
      if ((event.key === "/" && !typing) || (event.key === "k" && (event.metaKey || event.ctrlKey))) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <>
      <p className="notice">
        Free next morning delivery on orders over ${FREE_SHIPPING_FROM}. Order by 9pm.
      </p>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="page header-inner">
          <button
            type="button"
            className="icon-btn header-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" />
          </button>

          <Link to="/" className="wordmark" aria-label="Larder home">
            Larder<span aria-hidden="true">.</span>
          </Link>

          <nav className="header-nav" aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="search-trigger" onClick={() => setSearchOpen(true)}>
              <Icon name="search" size={18} />
              <span>Search</span>
              <kbd>/</kbd>
            </button>
            <button
              type="button"
              className="icon-btn search-icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Icon name="search" />
            </button>
            <Link to="/saved" className="icon-btn" aria-label={`Saved items (${saved.length})`}>
              <Icon name="heart" />
              {saved.length > 0 && <span className="count-badge">{saved.length}</span>}
            </Link>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setCartOpen(true)}
              aria-label={`Open bag, ${itemCount} items`}
            >
              <Icon name="bag" />
              {itemCount > 0 && <span className="count-badge">{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }) {
  const panelRef = useDialog(open, onClose);
  return (
    <div className={`sheet-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="scrim" onClick={onClose} />
      <div
        ref={panelRef}
        className="sheet sheet-left"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open || undefined}
      >
        <div className="sheet-head">
          <span className="wordmark">
            Larder<span aria-hidden="true">.</span>
          </span>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu">
            <Icon name="close" />
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-links">
          <Link to="/saved">Saved items</Link>
          <Link to="/orders">Your orders</Link>
          <Link to="/cart">Bag</Link>
        </div>
      </div>
    </div>
  );
}
