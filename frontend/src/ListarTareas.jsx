import './ListarTareas.css';

function ListarTareas({ tareas, onEliminar, onFinalizar, onEditar }) {
  if (!tareas || tareas.length === 0) {
    return <p className="tareas-vacias">No hay tareas para mostrar.</p>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };



  return (
    <div className="tareas-lista">
      {tareas.map((tarea) => (
        <article key={tarea.id} className="tarea-card">
          <header className="tarea-header">
            <div className="tarea-title-container">
              <span className="tarea-id">#{tarea.id}</span>
              <h2 className="tarea-resumen">{tarea.resumen || tarea.nombre_proyecto}</h2>
            </div>
            <div className="tarea-badges">
              {tarea.estado && (
                <span className={`badge estado-${tarea.estado.toLowerCase()}`}>
                  {tarea.estado}
                </span>
              )}
              {tarea.prioridad && (
                <span className="badge prioridad">{tarea.prioridad}</span>
              )}
            </div>
          </header>

          <p className="tarea-proyecto">
            <strong>Proyecto:</strong> {tarea.nombre_proyecto}
          </p>

          {tarea.descripcion && (
            <p className="tarea-descripcion">{tarea.descripcion}</p>
          )}

          <div className="tarea-detalles">
            {tarea.tipo_actividad && (
              <div>
                <span className="detalle-label">Tipo:</span> {tarea.tipo_actividad}
              </div>
            )}
            {tarea.persona_asignada && (
              <div>
                <span className="detalle-label">Asignado a:</span> {tarea.persona_asignada}
              </div>
            )}
            {tarea.informador && (
              <div>
                <span className="detalle-label">Informador:</span> {tarea.informador}
              </div>
            )}
            {tarea.sprint && (
              <div>
                <span className="detalle-label">Sprint:</span> {tarea.sprint}
              </div>
            )}
            {tarea.precondicion && (
              <div>
                <span className="detalle-label">Precondición:</span> {tarea.precondicion}
              </div>
            )}
            {tarea.fecha_creacion && (
              <div>
                <span className="detalle-label">Creada:</span> {formatDate(tarea.fecha_creacion)}
              </div>
            )}
            {tarea.fecha_cierre && (
              <div>
                <span className="detalle-label">Cierre:</span> {formatDate(tarea.fecha_cierre)}
              </div>
            )}
            </div>
            <div className="tarea-acciones">
              <button
                type="button"
                className="btn-accion btn-editar"
                onClick={() => onEditar && onEditar(tarea)}
              >
                Editar
              </button>
              {tarea.estado !== 'Finalizada' && (
                <button
                  type="button"
                  className="btn-accion btn-finalizar"
                  onClick={() => onFinalizar && onFinalizar(tarea.id)}
                >
                  Finalizar
                </button>
              )}
              <button
                type="button"
                className="btn-accion btn-eliminar"
                onClick={() => onEliminar && onEliminar(tarea.id)}
              >
                Eliminar
              </button>
            </div>
        </article>
      ))}
    </div>
  );
}

export default ListarTareas;