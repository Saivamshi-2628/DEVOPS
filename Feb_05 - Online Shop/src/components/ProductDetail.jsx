import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="product-detail product-detail-missing page-container">
        <p>Product not found.</p>
        <Link to="/products" className="btn btn-primary">Back to products</Link>
      </div>
    );
  }

  const priceFormatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  function handleAddToCart() {
    addToCart(product.id, 1);
  }

  return (
    <div className="product-detail">
      <div className="page-container wide">
        <Link to="/products" className="product-detail-back animate-fade-in">
          ← Back to products
        </Link>
        <article className="product-detail-card animate-scale-in">
          <div
            className="product-detail-visual"
            style={{ background: product.gradient }}
          >
            <span className="product-detail-icon" aria-hidden="true">{product.icon}</span>
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-tagline">{product.tagline}</p>
            <p className="product-detail-desc">{product.description}</p>
            <ul className="product-detail-specs" aria-label="Key features">
              {product.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
            <div className="product-detail-actions">
              <span className="product-detail-price">{priceFormatted}</span>
              <button type="button" className="btn btn-primary" onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>
        </article>
        <p className="product-detail-url-note">
          This page is driven by <strong>useParams()</strong> — the product ID <code>{id}</code> comes from the URL.
        </p>
      </div>
    </div>
  );
}

export default ProductDetail;
