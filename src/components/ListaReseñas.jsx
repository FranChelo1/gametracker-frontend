function ListaReseñas() {
  const reseñas = [
    {
      id: 1,
      juego: "The Witcher 3",
      autor: "Francisco",
      texto: "Una obra maestra con un mundo increíble.",
    },
  ];

  return (
    <section>
      <h2>📝 Reseñas</h2>

      {reseñas.map((r) => (
        <div className="card" key={r.id}>
          <h3>{r.juego}</h3>
          <p><strong>Autor:</strong> {r.autor}</p>
          <p>{r.texto}</p>

          <button>Editar</button>
          <button className="danger" style={{ marginLeft: "8px" }}>Eliminar</button>
        </div>
      ))}
    </section>
  );
}

export default ListaReseñas;
// Componente que muestra la lista de reseñas de juegos.
