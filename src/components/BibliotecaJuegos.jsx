// src/components/BibliotecaJuegos.jsx
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import {
  fetchGames,
  deleteGame,
  importSteamGames
} from "../api.js";
import "../style.css";
import { useNavigate } from "react-router-dom";

export default function BibliotecaJuegos() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [q, setQ] = useState("");
  const [filterPlatform, setFilterPlatform] = useState("");

  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchGames();
      setGames(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Eliminar juego
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este juego?")) return;

    await deleteGame(id);
    load();
  };

  // Importar desde Steam
  const handleImportSteam = async () => {
    const steamId = "76561198214796441";
    setImporting(true);

    try {
      const result = await importSteamGames(steamId);

      alert(`✔ Importación completada: ${result.added} juegos agregados.`);

      await load(); // recargar biblioteca
    } catch (err) {
      console.error(err);
      alert("❌ Error al importar juegos desde Steam.");
    }

    setImporting(false);
  };

  const platforms = [...new Set(games.map(g => g.platform).filter(Boolean))];

  const visibleGames = filterPlatform
    ? games.filter(g => g.platform === filterPlatform)
    : games;

  return (
    <div className="container">
      <h1 className="section-title">Mi Biblioteca</h1>

      {/* ===== FILTROS ===== */}
      <div className="toolbar">

        {/* BUSCADOR */}
        <input
          className="input"
          placeholder="Buscar por título..."
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === "Enter" && load()}
        />

        <button className="btn" onClick={load}>Buscar</button>

        {/* DROPDOWN DE PLATAFORMAS */}
        <select
          className="input"
          value={filterPlatform}
          onChange={(e) => setFilterPlatform(e.target.value)}
        >
          <option value="">Todas las plataformas</option>
          {platforms.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <button className="btn ghost" onClick={() => setFilterPlatform("")}>
          Reset
        </button>

        {/* BOTÓN AGREGAR */}
        <button
          className="btn green"
          onClick={() => navigate("/add")}
        >
          ➕ Agregar Juego
        </button>

        {/* BOTÓN IMPORTAR DESDE STEAM */}
        <button
          className="btn steam-btn"
          onClick={handleImportSteam}
          disabled={importing}
        >
          {importing ? "Importando..." : "📥 Importar desde Steam"}
        </button>
      </div>

      {/* ===== GRID ===== */}
      {loading ? (
        <p>Cargando...</p>
      ) : visibleGames.length === 0 ? (
        <p>No hay juegos que coincidan.</p>
      ) : (
        <div className="cards-container small-cards">
          {visibleGames.map(game => (
            <GameCard
              key={game._id}
              game={game}
              onEdit={() => navigate(`/edit/${game._id}`)}
              onDelete={() => handleDelete(game._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
