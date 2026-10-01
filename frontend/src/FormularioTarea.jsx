import { useState, useEffect } from 'react';
import './FormularioTarea.css';

const FORM_INICIAL = {
  nombreProyecto: '',
  tipoActividad: '',
  estado: 'Pendiente',
  resumen: '',
  descripcion: '',
  prioridad: 'Baja',
  informador: '',
  personaAsignada: '',
  precondicion: '',
  fechaCreacion: '',
  fechaCierre: '',
  sprint: '',
};

function FormularioTarea({ onGuardar, tareaEditando, onCancelar }) {
  const [form, setForm] = useState(FORM_INICIAL);

  useEffect(() => {
    if (tareaEditando) {
      setForm({
        nombreProyecto: tareaEditando.nombre_proyecto || '',
        tipoActividad: tareaEditando.tipo_actividad || '',
        estado: tareaEditando.estado || 'Pendiente',
        resumen: tareaEditando.resumen || '',
        descripcion: tareaEditando.descripcion || '',
        prioridad: tareaEditando.prioridad || 'Baja',
        informador: tareaEditando.informador || '',
        personaAsignada: tareaEditando.persona_asignada || '',
        precondicion: tareaEditando.precondicion || '',
        fechaCreacion: tareaEditando.fecha_creacion?.slice(0, 10) || '',
        fechaCierre: tareaEditando.fecha_cierre?.slice(0, 10) || '',
        sprint: tareaEditando.sprint || '',
      });
    } else {
      setForm(FORM_INICIAL);
    }
  }, [tareaEditando]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onGuardar(form);
    if (!tareaEditando) {
      setForm(FORM_INICIAL);
    }
  }

  return (
    <form className="tarea-form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">
        {tareaEditando ? `Editando Tarea #${tareaEditando.id}` : 'Nueva Tarea'}
      </h2>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" htmlFor="nombreProyecto">Nombre del Proyecto *</label>
          <input
            id="nombreProyecto"
            className="form-input"
            name="nombreProyecto"
            value={form.nombreProyecto}
            onChange={handleChange}
            placeholder="Nombre del Proyecto"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="tipoActividad">Tipo de Actividad *</label>
          <input
            id="tipoActividad"
            className="form-input"
            name="tipoActividad"
            value={form.tipoActividad}
            onChange={handleChange}
            placeholder="Tipo de Actividad"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="estado">Estado</label>
          <select id="estado" className="form-select" name="estado" value={form.estado} onChange={handleChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Finalizada">Finalizada</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="prioridad">Prioridad</label>
          <select id="prioridad" className="form-select" name="prioridad" value={form.prioridad} onChange={handleChange}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="form-group col-span-2">
          <label className="form-label" htmlFor="resumen">Resumen *</label>
          <input
            id="resumen"
            className="form-input"
            name="resumen"
            value={form.resumen}
            onChange={handleChange}
            placeholder="Resumen"
            required
          />
        </div>

        <div className="form-group col-span-2">
          <label className="form-label" htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            className="form-textarea"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="informador">Informador *</label>
          <input
            id="informador"
            className="form-input"
            name="informador"
            value={form.informador}
            onChange={handleChange}
            placeholder="Informador"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="personaAsignada">Persona Asignada *</label>
          <input
            id="personaAsignada"
            className="form-input"
            name="personaAsignada"
            value={form.personaAsignada}
            onChange={handleChange}
            placeholder="Persona asignada"
            required
          />
        </div>

        <div className="form-group col-span-2">
          <label className="form-label" htmlFor="precondicion">Precondición</label>
          <textarea
            id="precondicion"
            className="form-textarea"
            name="precondicion"
            value={form.precondicion}
            onChange={handleChange}
            placeholder="Precondición"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="fechaCreacion">Fecha de Creación *</label>
          <input
            id="fechaCreacion"
            type="date"
            className="form-input"
            name="fechaCreacion"
            value={form.fechaCreacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="fechaCierre">Fecha de Cierre</label>
          <input
            id="fechaCierre"
            type="date"
            className="form-input"
            name="fechaCierre"
            value={form.fechaCierre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-span-2">
          <label className="form-label" htmlFor="sprint">Sprint</label>
          <input
            id="sprint"
            className="form-input"
            name="sprint"
            value={form.sprint}
            onChange={handleChange}
            placeholder="Sprint"
          />
        </div>
      </div>

      <div className="form-actions">
        {tareaEditando && (
          <button
            type="button"
            className="form-btn-cancelar"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
        <button type="submit" className="form-submit-btn">
          {tareaEditando ? 'Actualizar Cambios' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

export default FormularioTarea;