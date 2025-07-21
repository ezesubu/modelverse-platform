# ModelVerse Platform

Plataforma web para la visualización y gestión interactiva de modelos 3D

![AppPreview1](https://github.com/user-attachments/assets/a39194d8-955d-48e4-98c5-6b6d6c6d5226)

---

## Tecnologías utilizadas

### Backend (NestJS)

* NestJS + TypeORM
* PostgreSQL (vía Supabase)
* Autenticación JWT
* Multer para manejo de archivos
* WebSockets con `socket.io`
* Seeds para creación de usuarios

### Frontend (Next.js + Tailwind CSS)

* Next.js App Router + Redux Toolkit
* Tailwind CSS + Google Fonts
* Interacción con la API via `axios`
* Visualización 3D con `three.js`, `@react-three/fiber`, `@react-three/drei`
* Soporte para archivos `.glb` y `.fbx`
* Manejo de estado con Redux y caché con `localStorage`
* Feedback visual para login, errores, carga y navegación protegida

### Cliente Unity

* Unity 2022+
* Socket.IO Client for Unity (protocolo WebSocket)
* Visualización básica de eventos en tiempo real

### Base de datos (Supabase)

* PostgreSQL gestionado por Supabase
* Configuración de roles y permisos
* Seed inicial con usuarios admin/viewer

---

## 🗃️ Estructura del proyecto

```
modelverse-platform/
├── backend/               # NestJS API
│   ├── src/
│   │   ├── auth/
│   │   ├── models3d/
│   │   ├── users/
│   │   └── socket/
│   ├── prisma/
│   └── ...
├── frontend/              # Next.js + Tailwind UI
│   ├── src/app/
│   ├── components/
│   ├── services/
│   ├── store/
│   └── ...
├── UnityProject/          # Unity (opcional)
├── docker-compose.yml     # Contenedor backend/frontend
└── README.md
```

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio**

```bash
git clone https://github.com/ezesubu/modelverse-platform.git
cd modelverse-platform
```

2. **Variables de entorno**
   Crear un archivo `.env` dentro de `backend/` con esta estructura:

```
DATABASE_HOST=aws-0-us-east-2.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_USER=YOUR_USER
DATABASE_PASSWORD=YOUR_PASSWORD
DATABASE_NAME=postgres
JWT_SECRET=YOUR_SECRET
BASE_URL=http://localhost:3001
```

3. **Levantar servicios con Docker**

```bash
docker-compose up --build
```

4. **Acceder a la plataforma**

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:3001](http://localhost:3001)

---

## 🔐 Usuarios iniciales (seed)

```ts
// backend/src/seed.ts
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'viewer', password: 'viewer123', role: 'viewer' },
];
```

Comando para correr el seed:

```bash
npm run seed:users 
```

Este script también elimina modelos y usuarios previos si existen.

---

## 📦 Funcionalidades principales

### Autenticación

* Inicio de sesión con credenciales y token JWT
* Guardas de rutas en frontend y backend
* Manejo de sesión con Redux Toolkit y localStorage

### Gestión de modelos 3D

* Subida de archivos `.glb`, `.fbx`, `.gltf`
* Almacenamiento con metadata (precio, licencia, tags...)
* Vista de detalle
* Edición y eliminación (solo por el autor)
* Descarga directa de archivos

### Dashboard y búsqueda avanzada

* Filtros por autor, formato, tags, precio y orden
* Paginación manual
* Resultados responsivos y dinámicos

### Visualización 3D

* Miniatura con imagen
* Visualizador interactivo con controles (rotación, zoom, navegación)

### WebSocket

* Socket.IO en NestJS
![websocket](https://github.com/user-attachments/assets/87cefcbf-728b-418f-ae36-c07e1910b342)
* Cliente Unity se conecta y recibe eventos de creación de modelos en tiempo real

---

## 📄 Documentos adicionales

* [`ARCHITECTURE.md`](./ARCHITECTURE.md): explicaciones técnicas
* [`docker-compose.yml`](./docker-compose.yml): configuración backend/frontend

---
