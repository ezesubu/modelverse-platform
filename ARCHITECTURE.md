# ARCHITECTURE.md

## 🏗️ Arquitectura General

Este documento detalla las decisiones arquitectónicas, estructura de carpetas y tecnologías clave utilizadas en el desarrollo de **ModelVerse Platform**.

---

## 🧱 Estructura del proyecto

```
modelverse-platform/
├── backend/               # API RESTful (NestJS + WebSockets)
│   ├── src/
│   │   ├── auth/          # Login y validación con JWT
│   │   ├── models3d/      # CRUD para modelos 3D
│   │   ├── users/         # Usuarios y roles
│   │   ├── seeds/         # Seeders iniciales
│   │   └── socket/        # Gateway WebSocket
│   ├── uploads/           # Archivos subidos
│   └── seed.ts            # Script para generar usuarios y limpiar modelos
├── frontend/              # Next.js + Redux + Visualización 3D
│   ├── src/
│   │   ├── app/           # Rutas App Router
│   │   ├── components/    # UI reutilizable
│   │   ├── services/      # Comunicación API
│   │   ├── store/         # Redux Toolkit (auth, cache)
│   │   └── hooks/         # Custom hooks (auth guard, etc)
│   └── public/            # Recursos públicos
├── UnityProject/          # Proyecto Unity con cliente WebSocket
├── docker-compose.yml     # Backend + Frontend listos para desarrollo local
├── README.md
└── ARCHITECTURE.md
```

---

## 📦 Tecnologías y versiones

### 🔧 Frontend (`frontend/package.json`)

* **Next.js**: 15.3.4
* **React**: ^19.0.0
* **Tailwind CSS**: ^4
* **Three.js**: ^0.177.0
* **@react-three/fiber**: ^9.1.2
* **@react-three/drei**: ^10.3.0
* **Redux Toolkit**: ^2.8.2
* **React Redux**: ^9.2.0
* **Socket.io-client**: ^4.8.1
* **TypeScript**: ^5

### ⚙️ Backend (`backend/package.json`)

* **NestJS**: ^11.0.1
* **TypeORM**: ^0.3.25
* **PostgreSQL Driver**: ^8.16.2
* **JWT & Auth**:

    * `@nestjs/jwt`: ^11.0.0
    * `passport-jwt`: ^4.0.1
    * `passport-local`: ^1.0.0
* **WebSockets**: `@nestjs/websockets` ^11.1.3, `socket.io` ^4.8.1
* **Multer** (file upload): ^2.0.1
* **TypeScript**: ^5.7.3
* **Prettier & ESLint**: v10+ y v9+
* **Seeder**: ejecutado con `ts-node`

### 🗄️ Base de Datos

* **Proveedor**: Supabase (PostgreSQL gestionado en la nube)
* **Host**: `aws-0-us-east-2.pooler.supabase.com`
* **Motor**: PostgreSQL 13+
* **Usuarios iniciales (via seed)**:

    * `admin / admin123`
    * `viewer / viewer123`
* **Permisos y roles**: manejados vía relaciones en la base de datos y JWT en backend

---

## 🧠 Decisiones Técnicas

### 🗂️ Separación de responsabilidades

* Arquitectura modular tanto en backend como frontend.
* Backend desacoplado en módulos por dominio (auth, models3d, users, socket).
* Frontend basado en App Router con componentes reutilizables.

### 🔐 Autenticación y Autorización

* Login vía `/auth/login` devolviendo JWT.
* Protección con `JwtAuthGuard` y validación por rol (`admin`, `viewer`).
* Token almacenado en `localStorage` para simplificar el flujo en frontend.

### 🌐 Comunicación en Tiempo Real

* Uso de `Socket.io` en NestJS para emitir eventos desde backend.
* Unity se conecta como cliente WebSocket y recibe actualizaciones en tiempo real (`modelUpdated`).
* La autenticación por token se omite en los sockets por simplicidad y compatibilidad.

### 🖼️ Visualización 3D

* Modelos `.glb` y `.fbx` son renderizados en navegador vía `three.js`.
* Integración con `@react-three/fiber` y `drei` para controles (`OrbitControls`).
* Soporte DRACO para compresión GLB.
* Unity se usa como cliente visual independiente en tiempo real.

### 🧪 Seeds y manejo de datos

* Seeds ejecutables con `npm run seed:users`.
* Crea usuarios y elimina modelos existentes para entorno limpio.

### 📋 Endpoints API

| Método | Ruta                       | Autenticación | Descripción                          |
| ------ | -------------------------- | ------------- | ------------------------------------ |
| POST   | /auth/login                | ❌             | Login y obtención de token JWT       |
| GET    | /models3d                  | ❌             | Obtener modelos con filtros          |
| GET    | /models3d/\:id             | ✅             | Obtener modelo por ID                |
| POST   | /models3d                  | ✅             | Subir nuevo modelo 3D                |
| PATCH  | /models3d/\:id             | ✅             | Actualizar un modelo                 |
| DELETE | /models3d/\:id             | ✅             | Eliminar un modelo                   |
| GET    | /models3d/me               | ✅             | Obtener modelos del usuario logueado |
| GET    | /files/models3d/\:filename | ✅             | Descargar archivo 3D                 |

> ✅ Requiere token JWT. Para usuarios autenticados vía headers: `Authorization: Bearer <token>`

---

## 🛠️ Mejoras Pendientes

| Área              | Mejora                                                                  |
| ----------------- | ----------------------------------------------------------------------- |
| Seguridad         | Autenticación vía token también para WebSockets                         |
| Backend           | Agregar paginación en `/models3d/me`                                    |
| Frontend          | Mejorar visualización y controles del visor 3D                          |
| Frontend          | Feedback visual en subida de modelos 3D (barra de progreso, etc.)       |
| Frontend          | Guardar token en cookies `httpOnly` en lugar de `localStorage`          |
| Frontend          | Validación frontend completa para formularios                           |
| Backend           | Soporte para múltiples formatos de preview (video, gif, thumbnail)      |
| Integración Unity | Permitir acciones en Unity a partir de los mensajes WebSocket recibidos |

---
Este proyecto fue desarrollado como parte de una Prueba Técnica para el rol de Desarrollador Senior Fullstack con Unity.

Autor: Ezequiel Suárez

Para cualquier duda o feedback, no dudes en contactarme. 
