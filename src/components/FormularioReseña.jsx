function FormularioReseña() {
  return (
    <section>
      <h2>✍️ Escribir Reseña</h2>

      <form>
        <label>Juego</label>
        <input type="text" placeholder="Ej: God of War" />

        <label>Reseña</label>
        <textarea placeholder="Escribe tu experiencia..."></textarea>

        <button>Guardar Reseña</button>
      </form>
    </section>
  );
}

export default FormularioReseña;
// Formulario para crear/editar reseñas de juegos.
