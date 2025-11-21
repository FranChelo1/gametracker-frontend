// src/components/Header.jsx
import { Link, useLocation } from "react-router-dom";
import "../style.css";

export default function Header() {
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <header className="app-header">
      <div className="header-inner">
        
        {/* LOGO */}
        <div className="header-logo">
          🎮 GameTracker
        </div>

        {/* NAV */}
        <nav className="header-nav">
          <Link
            to="/"
            className={
              isActive("/") &&
              !isActive("/library") &&
              !isActive("/game") &&
              !isActive("/stats")
                ? "nav-link active"
                : "nav-link"
            }
          >
            Inicio
          </Link>

          <Link
            to="/library"
            className={isActive("/library") ? "nav-link active" : "nav-link"}
          >
            Biblioteca
          </Link>

          <Link
            to="/stats"
            className={isActive("/stats") ? "nav-link active" : "nav-link"}
          >
            Estadísticas
          </Link>
        </nav>
      </div>
    </header>
  );
}
