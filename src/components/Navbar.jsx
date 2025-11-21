import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#222", color: "#fff", display: "flex", gap: "1rem" }}>
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/games" style={{ color: "#fff", textDecoration: "none" }}>Juegos</Link>
    </nav>
  );
}
