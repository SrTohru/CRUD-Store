```markdown
# CRUD-Store

CRUD-Store es un proyecto de ejemplo que muestra una pequeña tienda donde se pueden crear, leer, actualizar y eliminar elementos (CRUD). Está pensado como una aplicación práctica para aprender a conectar un frontend moderno con un backend en Python: la parte visual e interactiva está hecha con React y la lógica/servidor con Django.

## ¿De qué va este proyecto?
La idea principal es tener una aplicación sencilla donde puedas manejar un catálogo de productos (o cualquier otro tipo de recursos). Desde la interfaz puedes listar los ítems, ver detalles, crear nuevos, modificarlos o eliminarlos. El proyecto sirve tanto como demo para aprender como base para extender a algo más completo si lo deseas.

## Tecnologías que usa 
- Frontend: React (JavaScript) — para construir la interfaz, formularios y comunicaciones con el servidor.
- Backend: Django (Python) — expone una API que guarda y sirve los datos.
- HTML y CSS — para la estructura y estilos básicos de la página.
- Base de datos para desarrollo: SQLite (incluida por defecto con Django). En producción se puede usar PostgreSQL u otra base de datos.
- Comunicación entre frontend y backend: llamadas HTTP (fetch o librerías como axios) y manejo básico de CORS.

## Características principales
- Operaciones básicas CRUD: crear, ver, editar y borrar elementos.
- Interfaz sencilla en React para gestionar los ítems.
- API en Django que maneja las peticiones desde el frontend.
- Estructura pensada para separar claramente frontend y backend y facilitar su desarrollo independiente.
