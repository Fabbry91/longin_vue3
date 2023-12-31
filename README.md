# Proyecto de FullStack con Node.js, MySQL, Vite, Vue 3 y TypeScript

Este proyecto es una aplicación web que incluye un backend desarrollado en Node.js con TypeScript y una base de datos MySQL para gestionar usuarios con autenticación JWT. También cuenta con un frontend desarrollado en Vite y Vue 3 con TypeScript para interactuar con el backend.

## Requisitos

Asegúrate de tener instalados los siguientes elementos antes de comenzar:

- Node.js
- npm (Node Package Manager)
- MySQL Server

## Configuración del Backend

1. Clona el repositorio desde [git@github.com:Fabbry91/longin_vue3.git](git@github.com:Fabbry91/longin_vue3.git).

2. Ve al directorio del proyecto:

cd backend
npm install

3. Configura la base de datos MySQL. Crea una base de datos y un usuario con los permisos necesarios. Luego, actualiza la configuración en backend/src/config/db.ts con la información de tu base de datos.

4. Inicia el servidor backend:
npx tsc
npm run start
El servidor estará en funcionamiento en http://localhost:3000.

5. Instala las dependencias del frontend:
cd frontend
npm install

6. Inicia la aplicación frontend:
npm run dev --host (selecciona tu puerto de preferecncia)

Uso
- Abre un navegador web y accede a la aplicación frontend en http://localhost:....
- Regístrate o inicia sesión para acceder a las funcionalidades de CRUD de usuarios.
- Disfruta de las operaciones de Crear, Leer, Actualizar y Eliminar usuarios, todas con validaciones.

Recursos Adicionales
Node.js
Express
mysql2
Vue 3
Vite