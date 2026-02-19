import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-eyebrow animate-fade-in-up">Online Shop</p>
          <h1 className="hero-title animate-fade-in-up delay-1">
            Minimal. Fast. Modern.
          </h1>
          <p className="hero-subtitle animate-fade-in-up delay-2">
            A premium SPA built with React Router — nested routes, dynamic URL params,
            and a cart that just works.
          </p>
          <div className="hero-cta animate-fade-in-up delay-3">
            <Link to="/products" className="btn btn-primary">
              Explore products
            </Link>
            <Link to="/cart" className="btn btn-secondary">
              View cart
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="page-container">
          <h2 className="features-heading">Why this demo stands out</h2>
          <div className="features-grid">
            <div className="feature-card animate-fade-in-up delay-1">
              <span className="feature-icon" aria-hidden="true">⚡</span>
              <h3>React Router</h3>
              <p>Main routes for Home, Products, and Cart with clean URLs and instant navigation.</p>
            </div>
            <div className="feature-card animate-fade-in-up delay-2">
              <span className="feature-icon" aria-hidden="true">↳</span>
              <h3>Nested routes</h3>
              <p>Product details live at <code>/products/:id</code> — one route, dynamic content.</p>
            </div>
            <div className="feature-card animate-fade-in-up delay-3">
              <span className="feature-icon" aria-hidden="true">🛒</span>
              <h3>useParams()</h3>
              <p>Product ID comes from the URL. Change the route, see the right product every time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-block">
        <div className="page-container">
          <h2 className="cta-heading">Ready to explore?</h2>
          <p className="cta-text">Browse products and see nested routing in action.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Go to Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
