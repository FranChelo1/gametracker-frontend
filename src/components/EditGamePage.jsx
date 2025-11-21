// src/components/EditGamePage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style.css";

export default function EditGamePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    const res = await fetch(`http://localhost:4000/api/games/${id}`);
    const data = await res.json();
    setForm(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`http://localhost:4000/api/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        releaseYear: Number(form.releaseYear),
        hoursPlayed: Number(form.hoursPlayed),
        rating: Number(form.rating),
      }),
    });

    setSaving(false);
    navigate("/");
  };

  if (!form) return <p className="loading">Cargando...</p>;

  return (
    <div className="page-container">
      <h1 className="page-title">✏ Edit Game</h1>

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

        <button type="submit" disabled={saving} className="btn-submit">
          {saving ? "Saving..." : "Update Game"}
        </button>

        <button type="button" className="btn-back" onClick={() => navigate("/")}>
          ⬅ Volver
        </button>

      </form>
    </div>
  );
}
