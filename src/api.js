import axios from "axios";

// Usar el proxy de Vite (NO localhost)
const API = axios.create({
  baseURL: "/api",
});

// Juegos
export const fetchGames = () => API.get("/games").then(res => res.data);
export const fetchGame = (id) => API.get(`/games/${id}`).then(res => res.data);
export const createGame = (data) => API.post("/games", data).then(res => res.data);
export const updateGame = (id, data) => API.put(`/games/${id}`, data).then(res => res.data);
export const deleteGame = (id) => API.delete(`/games/${id}`).then(res => res.data);

// Reseñas
export const fetchReviews = (gameId = "") =>
  API.get(`/reviews${gameId ? `?gameId=${gameId}` : ""}`).then(res => res.data);
export const createReview = (data) => API.post("/reviews", data).then(res => res.data);
export const updateReview = (id, data) => API.put(`/reviews/${id}`, data).then(res => res.data);
export const deleteReview = (id) => API.delete(`/reviews/${id}`).then(res => res.data);

// Importar juegos de Steam (vía backend)
export const importSteamGames = (steamId) =>
  API.get(`/steam/import/${steamId}`).then(res => res.data);

export default API;
