import { Link, Outlet, useLocation } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./Products.css";

function Products() {
  const location = useLocation();
  const isProductDetail = location.pathname !== "/products";
  const { items, addToCart, updateQty } = useCart();

  if (isProductDetail) {
    return <Outlet />;
  }

  return (
    <div className="products-page">
      <div className="page-container wide">
        <div className="products-header animate-fade-in-up">
          <h1 className="products-title">Products</h1>
          <p className="products-subtitle">
            Add to cart from the card or open for details — nested routes and <code>useParams()</code>.
          </p>
        </div>
        <div className="products-grid">
          {products.map((p, i) => {
            const cartItem = items.find((item) => item.id === p.id);
            const qty = cartItem ? cartItem.qty : 0;
            const inCart = qty > 0;

            return (
              <div
                key={p.id}
                className="product-card animate-fade-in-up product-card-interactive"
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <Link to={p.id} className="product-card-link">
                  <div
                    className="product-card-visual"
                    style={{ background: p.gradient }}
                  >
                    <span className="product-card-icon" aria-hidden="true">{p.icon}</span>
                  </div>
                  <div className="product-card-info">
                    <h3 className="product-card-name">{p.name}</h3>
                    <p className="product-card-tagline">{p.tagline}</p>
                  </div>
                </Link>
                <div className="product-card-actions" onClick={(e) => e.stopPropagation()}>
                  {inCart ? (
                    <div className="product-card-qty">
                      <button
                        type="button"
                        className="product-qty-btn"
                        onClick={() => updateQty(p.id, qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="product-qty-value">{qty}</span>
                      <button
                        type="button"
                        className="product-qty-btn"
                        onClick={() => updateQty(p.id, qty + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary product-add-btn"
                      onClick={() => addToCart(p.id, 1)}
                    >
                      Add to cart
                    </button>
                  )}
                  <Link to={p.id} className="product-card-view-details">
                    View details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
