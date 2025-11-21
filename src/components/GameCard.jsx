// src/components/GameCard.jsx
import { useNavigate } from "react-router-dom";
import "./GameCard.css";

export default function GameCard({ game, onDelete, onEdit }) {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const full = "★".repeat(rating || 0);
    const empty = "☆".repeat(5 - (rating || 0));
    return full + empty;
  };

  return (
    <div className="game-card">
      
      <img
        src={game.coverUrl || "https://via.placeholder.com/300x180?text=No+Cover"}
        alt={game.title}
        className="game-card-img"
      />

      <h3 className="title">{game.title}</h3>

      <p>🎮 {game.genre || "Sin género"}</p>
      <p>🖥️ {game.platform || "Sin plataforma"}</p>
      <p>📅 {game.releaseYear || "N/A"}</p>

      {/* ⭐⭐⭐⭐⭐ Rating dinámico */}
      <p className="rating-stars">
        {renderStars(game.rating)}
      </p>

      <span className={game.completed ? "status done" : "status pending"}>
        {game.completed ? "Completed" : "Pending"}
      </span>

      <p className="description">{game.description}</p>

      <div className="buttons">
        <button
          className="btn-blue"
          onClick={() => navigate(`/game/${game._id}`)}
        >
          Ver reseñas
        </button>

        <button
          className="btn-green"
          onClick={() => navigate(`/game/${game._id}`)}
        >
          Agregar reseña
        </button>

        <button className="btn-yellow" onClick={onEdit}>Editar</button>
        <button className="btn-red" onClick={onDelete}>Eliminar</button>
      </div>
    </div>
  );
}
