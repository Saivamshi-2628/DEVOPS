import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { items, totalItems, totalPrice, updateQty, removeFromCart, clearCart } = useCart();

  const totalFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="page-container">
          <div className="cart-empty animate-fade-in-up">
            <div className="cart-empty-icon" aria-hidden="true">🛒</div>
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-text">
              Add products from the Products page. Each product detail uses a nested route and <code>useParams()</code>.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-container wide">
        <header className="cart-header animate-fade-in-up">
          <h1 className="cart-title">Your cart</h1>
          <p className="cart-subtitle">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </header>

        <div className="cart-list">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="cart-item animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div
                className="cart-item-visual"
                style={{ background: item.gradient }}
              >
                <span className="cart-item-icon" aria-hidden="true">{item.icon}</span>
              </div>
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(item.price)}{" "}
                  each
                </p>
              </div>
              <div className="cart-item-qty">
                <button
                  type="button"
                  className="cart-qty-btn"
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="cart-qty-value">{item.qty}</span>
                <button
                  type="button"
                  className="cart-qty-btn"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(item.price * item.qty)}
              </div>
              <button
                type="button"
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-footer animate-fade-in-up">
          <div className="cart-footer-actions">
            <button type="button" className="btn btn-secondary" onClick={clearCart}>
              Clear cart
            </button>
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-value">{totalFormatted}</span>
            </div>
          </div>
          <Link to="/products" className="cart-continue">
            Continue shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
