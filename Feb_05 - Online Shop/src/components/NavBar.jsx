import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./NavBar.css";

function NavBar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="Home">
          Shop
        </Link>
        <nav className="navbar-links" aria-label="Main">
          <NavLink to="/" className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")} end>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>
            Products
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => "navbar-link navbar-cart" + (isActive ? " active" : "")}>
            Cart
            {totalItems > 0 && (
              <span className="navbar-cart-badge" aria-label={`${totalItems} items in cart`}>
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
