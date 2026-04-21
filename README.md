# ✅ HABITZZ - Habit Tracker SaaS

¡Bienvenido a **Habitzz**! Una aplicación robusta diseñada para dominar tus rutinas y conquistar tus objetivos semanales. Este proyecto utiliza un stack moderno y una arquitectura escalable para garantizar una experiencia de usuario fluida y eficiente.

---

## 🏗️ Arquitectura del Sistema

El proyecto está dividido en una estructura desacoplada (Frontend/Backend) permitiendo un mantenimiento independiente y escalable.

**Flujo de Petición Backend:**
`Cliente` → `Router` → `Controller` → `Service` → `Repository` → `Database (MongoDB)`

### 📂 Estructura de Carpetas

```text
frontend/src/
├── api/          # Configuraciones de Axios y fetchers
├── app/          # Rutas (App Router), layouts y páginas
├── components/   # Componentes de UI reutilizables
├── hooks/        # Lógica de React personalizada
├── mocks/        # Datos de prueba para desarrollo
├── providers/    # Contextos globales (Auth, QueryClient)
├── services/     # Llamadas a la API organizadas por recurso
├── types/        # Interfaces y tipos de TypeScript
└── utils/        # Helpers y formateadores de datos
```

```text
backend/src/
├── config/       # Configuraciones de DB y variables
├── controllers/  # Manejo de peticiones y respuestas
├── middlewares/  # Validaciones y seguridad (JWT)
├── models/       # Esquemas de Mongoose
├── repositories/ # Consultas directas a la base de datos
├── routes/       # Definición de endpoints
├── schemas/      # Validaciones con Zod
├── services/     # Lógica de negocio core
└── utils/        # Funciones de ayuda y cálculos
```

## 🛠️ Stack Tecnológico

### **Frontend**

- **Framework**: Next.js 14 (App Router).
- **Gestión de Estado**: Context API para autenticación global.
- **Data Fetching**: TanStack Query (React Query) & Axios.
- **UI & Estilos**: Tailwind CSS, Ant Design & Lucide Icons.

### **Backend**

- **Runtime**: Node.js & Express.
- **Base de Datos**: MongoDB & Mongoose.
- **Validación**: Zod (Esquemas de datos).
- **Autenticación**: JWT (JSON Web Tokens).

## 🗺️ Mapa de Rutas (Frontend)

| Ruta                   | Descripción                                          |
| :--------------------- | :--------------------------------------------------- |
| `/`                    | Landing Page informativa para usuarios no logueados. |
| `/login` / `/register` | Gestión de acceso y creación de cuentas.             |
| `/dashboard`           | Panel principal de seguimiento de hábitos diarios.   |
| `/dashboard/goals`     | Gestión y visualización de metas semanales.          |

## 📡 Endpoints de la API (Backend)

**Base URL:** `https://habits-saas.onrender.com/api/v1`

| Recurso      | Métodos                        | Descripción                                 |
| :----------- | :----------------------------- | :------------------------------------------ |
| `/auth`      | `POST`                         | Registro y Login de usuarios.               |
| `/habits`    | `GET`, `POST`, `PUT`, `DELETE` | Gestión completa de hábitos y estados.      |
| `/dashboard` | `GET`                          | Estadísticas, rachas y resumen de progreso. |
| `/goal`      | `GET`, `POST`, `DELETE`        | Control de metas y objetivos semanales.     |
| `/ping`      | `GET`                          | Health check (Mantiene el servidor activo). |

## 🚀 Configuración y Despliegue

### 🔐 Variables de Entorno

**Backend (`.env`):**

- `PORT`: Puerto donde corre el servidor.
- `MONGO_URI`: URL de conexión a MongoDB Atlas.
- `JWT_SECRET`: Clave secreta para la firma de tokens.
- `JWT_EXPIRES_IN`: Tiempo de expiración del token (ej: `7d`).

**Frontend (`.env.local`):**

- `NEXT_PUBLIC_API_URL`: `https://habits-saas.onrender.com/api/v1`

### 🛠️ Instalación y Ejecución

```bash
# Instalar dependencias (omitiendo conflictos de versiones)
npm install --legacy-peer-deps

# Iniciar en modo desarrollo
npm run dev

# Compilar e iniciar en producción
npm run build && npm start
```

### 🌍 Deployment

- **Backend:** Alojado en **Render**. Cuenta con un endpoint `/ping` para mitigar el _cold start_ del plan gratuito.
- **Frontend:** Alojado en **Vercel** para aprovechar la optimización nativa de Next.js.

## 👤 Autor

**Adrian Ortiz**

- 🌐 **Portfolio**: [adrianortiz.vercel.app](https://adrianortiz.vercel.app/)
- 🐙 **GitHub**: [AdrianOrtizz](https://github.com/AdrianOrtizz)
- 📧 **Email**: [adrianortizzt1vl@gmail.com](mailto:adrianortizzt1vl@gmail.com)

---

© 2026 Habitzz - Hecho con ❤️ para mejorar tu constancia.
