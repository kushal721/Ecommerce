import { Outlet, ScrollRestoration } from "react-router";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";
import Header from "./Header";
import SearchOverlay from "./SearchOverlay";
import Toast from "./Toast";

export default function Layout() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
      <ScrollRestoration />
    </>
  );
}
