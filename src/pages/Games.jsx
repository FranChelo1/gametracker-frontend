import { useEffect, useState } from "react";
import API from "../services/api";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    API.get("/games")
      .then((res) => setGames(res.data))
      .catch((err) => console.error("Error cargando juegos:", err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Juegos disponibles</h1>
      {games.length === 0 && <p>Cargando juegos...</p>}

      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <strong>{game.title}</strong> — {game.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}
