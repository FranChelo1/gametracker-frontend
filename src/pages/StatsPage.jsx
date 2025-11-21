// src/pages/StatsPage.jsx
import { useEffect, useState } from "react";
import { fetchGames } from "../api";

export default function StatsPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchGames();
        setGames(data);
      } catch (err) {
        console.error("Error loading games for stats:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // === CÁLCULOS DE ESTADÍSTICAS ===
  const totalGames = games.length;
  const completedGames = games.filter(g => g.completed).length;
  const pendingGames = totalGames - completedGames;

  const totalHours = games.reduce(
    (sum, g) => sum + (g.hoursPlayed || 0),
    0
  );

  const avgRating =
    totalGames > 0
      ? (
          games.reduce((sum, g) => sum + (g.rating || 0), 0) /
          totalGames
        ).toFixed(1)
      : "0.0";

  const topByHours = [...games]
    .sort((a, b) => (b.hoursPlayed || 0) - (a.hoursPlayed || 0))
    .slice(0, 5);

  const topByRating = [...games]
    .filter(g => (g.rating || 0) > 0)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="stats-page">
        <div className="container">
          <p style={{ textAlign: "center", marginTop: "40px" }}>
            Cargando estadísticas...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-page">
      <div className="container">
        <h1 className="stats-title">Estadísticas de tu biblioteca</h1>
        <p className="stats-subtitle">
          Un vistazo general a tus juegos y progreso.
        </p>

        {/* MÉTRICAS PRINCIPALES */}
        <div className="stats-grid">
          <div className="stats-card">
            <h3>Juegos totales</h3>
            <p className="stats-number">{totalGames}</p>
            <span className="stats-label">En tu biblioteca</span>
          </div>

          <div className="stats-card">
            <h3>Completados</h3>
            <p className="stats-number">{completedGames}</p>
            <span className="stats-label">
              {totalGames > 0
                ? `${Math.round((completedGames / totalGames) * 100)}% del total`
                : "Sin datos"}
            </span>
          </div>

          <div className="stats-card">
            <h3>Pendientes</h3>
            <p className="stats-number">{pendingGames}</p>
            <span className="stats-label">Por terminar</span>
          </div>

          <div className="stats-card">
            <h3>Horas jugadas</h3>
            <p className="stats-number">{totalHours}</p>
            <span className="stats-label">Sumando todos los juegos</span>
          </div>

          <div className="stats-card">
            <h3>Rating promedio</h3>
            <p className="stats-number">{avgRating}</p>
            <span className="stats-label">De 0 a 5 estrellas</span>
          </div>
        </div>

        {/* TOP POR HORAS */}
        <div className="stats-section">
          <h2 className="stats-section-title">Top 5 por horas jugadas</h2>
          {topByHours.length === 0 ? (
            <p className="stats-empty">No hay datos de horas jugadas.</p>
          ) : (
            <ul className="stats-list">
              {topByHours.map((g, idx) => (
                <li key={g._id || g.title}>
                  <span className="stats-rank">#{idx + 1}</span>
                  <span className="stats-game-title">{g.title}</span>
                  <span className="stats-game-meta">
                    {g.hoursPlayed || 0} hs · {g.platform || "Sin plataforma"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TOP POR RATING */}
        <div className="stats-section">
          <h2 className="stats-section-title">Top 5 por rating</h2>
          {topByRating.length === 0 ? (
            <p className="stats-empty">No hay juegos con rating asignado.</p>
          ) : (
            <ul className="stats-list">
              {topByRating.map((g, idx) => (
                <li key={g._id || g.title}>
                  <span className="stats-rank">#{idx + 1}</span>
                  <span className="stats-game-title">{g.title}</span>
                  <span className="stats-game-meta">
                    ⭐ {g.rating} · {g.platform || "Sin plataforma"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
