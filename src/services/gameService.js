import axios from "axios";

const API = "http://localhost:3000";

export const getGames = async () => {
  const res = await axios.get(`${API}/games`);
  return res.data;
};

export const addGame = async (game) => {
  const res = await axios.post(`${API}/games`, game);
  return res.data;
};
