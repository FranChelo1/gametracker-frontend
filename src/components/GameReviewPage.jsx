// src/components/GameReviewPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function GameReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    const res = await fetch(`http://localhost:4000/api/games/${id}`);
    const data = await res.json();
    setGame(data);
  };

  const addReview = async () => {
    if (!review.trim()) return;

    await fetch(`http://localhost:4000/api/games/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: review }),
    });

    setReview("");
    loadGame();
  };

  if (!game) return <p>Cargando...</p>;

  return (
    <div className="page-container">
      <button onClick={() => navigate("/")}>⬅ Back</button>

      <h1>Reviews for: {game.title}</h1>

      <ul className="review-list">
        {game.reviews?.map((r, i) => (
          <li key={i}>{r.text}</li>
        ))}
      </ul>

      <textarea
        placeholder="Write review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button onClick={addReview}>Add Review</button>
    </div>
  );
}
