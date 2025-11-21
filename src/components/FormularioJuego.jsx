// Formulario para crear/editar (usar controlled inputs y llamar a createGame o updateGame).
function FormularioJuego() {
  return (
    <section>
      <h2>➕ Agregar Juego</h2>

      <form>
        <label>Título</label>
        <input type="text" placeholder="Ej: Red Dead Redemption 2" />

        <label>Género</label>
        <input type="text" placeholder="Ej: Acción, Aventura" />

        <label>URL de portada</label>
        <input type="text" placeholder="http://imagen.com/portada.jpg" />

        <label>Horas jugadas</label>
        <input type="number" min="0" />

        <label>Completado</label>
        <select>
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>

        <label>Puntuación</label>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>

        <button>Guardar</button>
      </form>
    </section>
  );
}

export default FormularioJuego;
// Formulario para crear/editar juegos en la biblioteca del usuario.
