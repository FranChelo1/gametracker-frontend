import { useEffect, useState } from "react";
import { getGames } from "../services/gameService";

function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getGames();
      setGames(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Listado de Juegos</h1>

      {games.length === 0 ? (
        <p>No hay juegos cargados.</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              <strong>{game.title}</strong> — {game.status} ({game.platform})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GamesPage;
