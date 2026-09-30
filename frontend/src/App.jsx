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
        .then((res) => res.json())
        .then((tareaActualizada) => {
          setTareas(tareas.map((t) => (t.id === tareaActualizada.id ? tareaActualizada : t)));
          setTareaEditando(null);
        });
    } else {
      // Crear: POST
      fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tareaAEnviar),
      })
        .then((res) => res.json())
        .then((tareaCreada) => {
          setTareas([...tareas, tareaCreada]);
        });
    }
  }

  function eliminarTarea(id) {
  fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
    .then(() => {
      setTareas(tareas.filter((t) => t.id !== id));
    });
}

function finalizarTarea(id) {
  fetch(`${API_URL}/tasks/${id}/finalizar`, { method: 'PATCH' })
    .then((res) => res.json())
    .then((tareaActualizada) => {
      setTareas(tareas.map((t) => (t.id === id ? tareaActualizada : t)));
    });
}


  function agregarTarea(nuevaTarea) {
    const tareaAEnviar = {
    ...nuevaTarea,
    fechaCierre: nuevaTarea.fechaCierre || null,
  };

    fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tareaAEnviar),
    })
      .then((res) => res.json())
      .then((tareaCreada) => {
        setTareas([...tareas, tareaCreada]);
      });
  }

 return (
    <div>
      <h1>Gestor de Tareas</h1>
      <FormularioTarea onGuardar={guardarTarea} tareaEditando={tareaEditando} />
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