import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found-content animate-fade-in-up">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1 className="not-found-title">Page not found</h1>
        <p className="not-found-text">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
