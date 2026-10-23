import { Link } from "react-router";
import { DEPARTMENTS } from "../lib/catalog";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="page">
        <div className="footer-top">
          <div className="footer-letter">
            <h2>One letter a week. What is in season, what is on offer, one recipe.</h2>
            <Newsletter />
          </div>
          <div className="footer-cols">
            <div>
              <h3>Aisles</h3>
              <ul>
                {DEPARTMENTS.map((d) => (
                  <li key={d.id}>
                    <Link to={`/shop/${d.id}`}>{d.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Your account</h3>
              <ul>
                <li>
                  <Link to="/cart">Bag</Link>
                </li>
                <li>
                  <Link to="/saved">Saved items</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3>Project</h3>
              <ul>
                <li>
                  <a href="https://github.com/kushal721/Ecommerce">Source on GitHub</a>
                </li>
                <li>
                  <a href="https://dummyjson.com/docs/products">Product data</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="footer-word" aria-hidden="true">
          Larder.
        </p>
        <div className="footer-base">
          <span>Demo store. No real orders are shipped or charged.</span>
          <span>MIT licensed, {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
