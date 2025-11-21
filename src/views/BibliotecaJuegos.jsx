import { useEffect, useState } from 'react';
import { fetchGames, deleteGame } from '../services/api';
import TarjetaJuego from '../components/TarjetaJuego';
import FormularioJuego from '../components/FormularioJuego';

export default function BibliotecaJuegos(){
  const [games, setGames] = useState([]);
  useEffect(()=> {
    load();
  }, []);
  const load = async ()=> {
    const res = await fetchGames();
    setGames(res.data);
  };
  const handleDelete = async (id)=> { await deleteGame(id); load(); };
  return (
    <div>
      <h1>Mi Biblioteca</h1>
      <FormularioJuego onSaved={load} />
      <div className="cards">
        {games.map(g=> <TarjetaJuego key={g._id} game={g} onDelete={handleDelete} />)}
      </div>
    </div>
  );
}
