import { useState, useEffect } from 'react';
import ListarTareas from './ListarTareas';
import FormularioTarea from './FormularioTarea';

const API_URL = 'http://localhost:4000';

function App() {
  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);
  
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTareas(data));
  }, []);

  function guardarTarea(datosForm) {
    const tareaAEnviar = {
      ...datosForm,
      fechaCierre: datosForm.fechaCierre || null,
    };

    if (tareaEditando) {
      // Editar: PUT
      fetch(`${API_URL}/tasks/${tareaEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tareaAEnviar),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error al actualizar la tarea');
          return res.json();
        })
        .then((tareaActualizada) => {
          setTareas((prev) =>
            prev.map((t) => (t.id === tareaActualizada.id ? tareaActualizada : t))
          );
          setTareaEditando(null);
        })
        .catch(console.error);
    } else {
      // Crear: POST
      fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tareaAEnviar),
      })
        .then((res) => {
          if (!res.ok) throw new Error('Error al crear la tarea');
          return res.json();
        })
        .then((tareaCreada) => {
          setTareas((prev) => [...prev, tareaCreada]);
        })
        .catch(console.error);
    }
  }

  function eliminarTarea(id) {
    fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar');
        setTareas((prev) => prev.filter((t) => t.id !== id));
        if (tareaEditando?.id === id) {
          setTareaEditando(null);
        }
      })
      .catch(console.error);
  }

  function finalizarTarea(id) {
    fetch(`${API_URL}/tasks/${id}/finalizar`, { method: 'PATCH' })
      .then((res) => {
        if (!res.ok) throw new Error('Error al finalizar');
        return res.json();
      })
      .then((tareaActualizada) => {
        setTareas((prev) =>
          prev.map((t) => (t.id === id ? tareaActualizada : t))
        );
      })
      .catch(console.error);
  }

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <FormularioTarea
        onGuardar={guardarTarea}
        tareaEditando={tareaEditando}
        onCancelar={() => setTareaEditando(null)}
      />
      <ListarTareas
        tareas={tareas}
        onEliminar={eliminarTarea}
        onFinalizar={finalizarTarea}
        onEditar={setTareaEditando}
      />
    </div>
  );
}

export default App;