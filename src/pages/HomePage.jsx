// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";
import "../style.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-hero">
      <div className="home-hero-overlay">
        <h1 className="home-title">GameTracker</h1>
        <p className="home-subtitle">
          Organiza tu biblioteca de videojuegos, registra horas jugadas
          y escribe reseñas al estilo Steam.
        </p>

        <button
          className="home-button"
          onClick={() => navigate("/library")}
        >
          Entrar a mi biblioteca
        </button>
      </div>
    </div>
  );
}

export default HomePage;
