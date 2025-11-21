// src/components/AddGamePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function AddGamePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    genre: "",
    platform: "",
    releaseYear: "",
    developer: "",
    coverUrl: "",
    description: "",
    completed: false,
    hoursPlayed: 0,
    rating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:4000/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          releaseYear: form.releaseYear ? Number(form.releaseYear) : null,
          hoursPlayed: Number(form.hoursPlayed),
          rating: Number(form.rating),
        }),
      });

      if (!res.ok) throw new Error("Error saving game");

      setMessage("Game added ✔️");

      setForm({
        title: "",
        genre: "",
        platform: "",
        releaseYear: "",
        developer: "",
        coverUrl: "",
        description: "",
        completed: false,
        hoursPlayed: 0,
        rating: 0,
      });

    } catch {
      setMessage("❌ Error saving game");
    }

    setLoading(false);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">➕ Add New Game</h1>

      <form onSubmit={handleSubmit} className="game-form">

        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />

        <label>Genre</label>
        <input name="genre" value={form.genre} onChange={handleChange} />

        <label>Platform</label>
        <input name="platform" value={form.platform} onChange={handleChange} />

        <label>Release Year</label>
        <input type="number" name="releaseYear" value={form.releaseYear} onChange={handleChange} />

        <label>Developer</label>
        <input name="developer" value={form.developer} onChange={handleChange} />

        <label>Cover URL</label>
        <input name="coverUrl" value={form.coverUrl} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} />

        <label>Hours Played</label>
        <input type="number" name="hoursPlayed" value={form.hoursPlayed} onChange={handleChange} />

        <label>Rating (0-5)</label>
        <input type="number" min="0" max="5" name="rating" value={form.rating} onChange={handleChange} />

        <label className="checkbox-row">
          <input type="checkbox" name="completed" checked={form.completed} onChange={handleChange} />
          Completed
        </label>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? "Saving..." : "Save Game"}
        </button>

        {message && <p className="message">{message}</p>}

        <button type="button" className="btn-back" onClick={() => navigate("/")}>
          ⬅ Volver
        </button>

      </form>
    </div>
  );
}
