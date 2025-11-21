// src/App.jsx
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BibliotecaJuegos from "./components/BibliotecaJuegos";
import AddGamePage from "./components/AddGamePage";
import EditGamePage from "./components/EditGamePage";
import GameDetails from "./views/GameDetails";
import Header from "./components/Header";
import StatsPage from "./pages/StatsPage"; // <-- NUEVO

import "./style.css";

// Layout Biblioteca
function LibraryLayout() {
  return (
    <>
      <Header />
      <BibliotecaJuegos />
    </>
  );
}

// Layout Game Details
function GameDetailsLayout() {
  return (
    <>
      <Header />
      <GameDetails />
    </>
  );
}

// Layout Stats
function StatsLayout() {
  return (
    <>
      <Header />
      <StatsPage />
    </>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Routes>

        {/* HOME */}
        <Route path="/" element={<HomePage />} />

        {/* BIBLIOTECA */}
        <Route path="/library" element={<LibraryLayout />} />

        {/* AGREGAR / EDITAR */}
        <Route path="/add" element={<AddGamePage />} />
        <Route path="/edit/:id" element={<EditGamePage />} />

        {/* DETALLES DEL JUEGO */}
        <Route path="/game/:id" element={<GameDetailsLayout />} />

        {/* ESTADÍSTICAS */}
        <Route path="/stats" element={<StatsLayout />} />

      </Routes>
    </div>
  );
}
