# Gestor de Tareas — React + Express + Postgres (Docker)

Aplicación para gestionar tareas de proyectos de software: un formulario en
React para crear/editar tareas, un listado con acciones de editar, eliminar
y finalizar, un backend en Express con API REST, y persistencia en Postgres.
Todo corre dentro de contenedores Docker.

## Estructura del proyecto

tasks-condocker/
├── backend/ # API en Express (Node.js)
├── frontend/ # App en React (Vite)
└── docker-compose.yml



## Cómo levantar el proyecto

Requisito: tener Docker y Docker Compose instalados.

1. Clonar el repositorio
2. Desde la raíz del proyecto, correr:
```bash
   docker compose up --build
```
3. Esperar a que los tres servicios (`db`, `backend`, `frontend`) terminen de levantar
4. Abrir `http://localhost:5173` en el navegador

Con ese único comando se levantan juntos:
- **Postgres** (puerto `5433`), con la tabla `tasks` creada automáticamente
- **Backend** (puerto `4000`), la API REST
- **Frontend** (puerto `5173`), servido por Nginx

## Correr el backend sin Docker (opcional, para desarrollo)

1. `cd backend`
2. `npm install`
3. Copiar `.env.template` a `.env` y completar las variables
4. Necesitás una instancia de Postgres corriendo en el puerto que pongas en `.env` (por ejemplo, vía `docker run` con la imagen de Postgres)
5. `node index.js`

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/tasks` | Lista todas las tareas |
| `POST` | `/tasks` | Crea una tarea nueva |
| `PUT` | `/tasks/:id` | Actualiza una tarea existente (reemplazo completo) |
| `DELETE` | `/tasks/:id` | Elimina una tarea |
| `PATCH` | `/tasks/:id/finalizar` | Marca una tarea como "Finalizada" y setea la fecha de cierre |

## Modelo de datos (tabla `tasks`)

Nombre del Proyecto, Tipo de Actividad, Estado (Pendiente / En progreso /
Finalizada), Resumen, Descripción, Prioridad (Baja / Media / Alta),
Informador, Persona asignada, Precondición, Fecha de Creación, Fecha de
Cierre, Sprint.