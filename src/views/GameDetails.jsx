// src/views/GameDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchGame,
  fetchReviews,
  createReview,
} from "../api";

export default function GameDetails() {
  const { id } = useParams();

  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [reviewForm, setReviewForm] = useState({
    score: 5,
    reviewText: "",
    hoursPlayed: 0,
    difficulty: "Normal",
    recommend: false,
  });

  const renderStars = (n) => {
    const full = "★".repeat(n || 0);
    const empty = "☆".repeat(5 - (n || 0));
    return full + empty;
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    const gameData = await fetchGame(id);
    const reviewsData = await fetchReviews(id);

    setGame(gameData);
    setReviews(reviewsData);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createReview({
      gameId: id,
      ...reviewForm,
    });

    setReviewForm({
      score: 5,
      reviewText: "",
      hoursPlayed: 0,
      difficulty: "Normal",
      recommend: false,
    });

    loadData();
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!game) return <p>No se encontró el juego.</p>;

  return (
    <div className="container" style={{ maxWidth: "900px" }}>

      {/* PANEL PRINCIPAL */}
      <div className="game-details-panel">

        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

          <img
            src={game.coverUrl || "https://via.placeholder.com/300x180?text=No+Cover"}
            alt={game.title}
            style={{
              width: "280px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />

          <div style={{ flex: 1, minWidth: "250px" }}>
            {/* ★★★★★ rating arriba del título */}
            <div className="rating-big">
              {renderStars(game.rating)}
            </div>

            <h1 className="game-details-title">{game.title}</h1>

            <p>🎮 {game.genre}</p>
            <p>🖥️ {game.platform}</p>
            <p>📅 {game.releaseYear}</p>
            <p>🏭 {game.developer}</p>

            <p style={{ marginTop: "12px", lineHeight: "1.5" }}>
              {game.description}
            </p>
          </div>
        </div>
      </div>

      {/* RESEÑAS */}
      <div className="game-details-panel">
        <h2 className="game-details-title" style={{ fontSize: "22px" }}>Reseñas</h2>

        {reviews.length === 0 && (
          <p style={{ opacity: 0.7 }}>Aún no hay reseñas.</p>
        )}

        {reviews.map((r) => (
          <div key={r._id} className="review-card">

            <div className="review-stars">{renderStars(r.score)}</div>

            <p className="review-text">{r.reviewText}</p>

            <div className="review-meta">
              <p>Horas jugadas: {r.hoursPlayed}</p>
              <p>Dificultad: {r.difficulty}</p>
              <p>Recomienda: {r.recommend ? "Sí" : "No"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FORMULARIO */}
      <div className="game-details-panel">
        <h2 className="game-details-title" style={{ fontSize: "22px" }}>Escribir reseña</h2>

        <form onSubmit={handleSubmit} className="game-form">
          <label>Puntuación</label>
          <select
            value={reviewForm.score}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, score: Number(e.target.value) })
            }
          >
            <option value={5}>5 ★</option>
            <option value={4}>4 ★</option>
            <option value={3}>3 ★</option>
            <option value={2}>2 ★</option>
            <option value={1}>1 ★</option>
          </select>

          <label>Reseña</label>
          <textarea
            value={reviewForm.reviewText}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, reviewText: e.target.value })
            }
            placeholder="Escribe tu reseña..."
          />

          <label>Horas jugadas</label>
          <input
            type="number"
            value={reviewForm.hoursPlayed}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, hoursPlayed: Number(e.target.value) })
            }
          />

          <label>Dificultad</label>
          <select
            value={reviewForm.difficulty}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, difficulty: e.target.value })
            }
          >
            <option value="Easy">Easy</option>
            <option value="Normal">Normal</option>
            <option value="Hard">Hard</option>
            <option value="Muy Difícil">Muy Difícil</option>
          </select>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={reviewForm.recommend}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, recommend: e.target.checked })
              }
            />
            ¿Recomendarías este juego?
          </label>

          <button type="submit">Publicar reseña</button>
        </form>
      </div>
    </div>
  );
}
