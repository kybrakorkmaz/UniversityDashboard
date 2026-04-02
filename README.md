# UniversityDashboard
# University Dashboard Project

This project is a web application designed to display and manage university courses and related data.

**Frontend Stack:** The user interface is built using **React** and enhanced with **Refine**, **shadcn/ui**, **Tailwind CSS**, **TypeScript**, and **Zod** to provide a responsive, type-safe, and component-driven experience.

**Backend Stack:** The server is developed with **Node.js**, **Express.js**, **Drizzle ORM**, **Neon (PostgreSQL)**, and security/authentication handled via **Arcjet** and **Better Auth**. Media assets are managed with **Cloudinary**.

**Dev Tools:** Code quality and monitoring are supported with **CodeRabbit**, **Junie** and **Site24x7**.

---

## Live Application

- **Frontend (React, Refine, shadcn/ui):** [https://university-dashboard-black.vercel.app](https://university-dashboard-black.vercel.app)
- **Backend (Node.js, Express.js, Drizzle ORM, Neon):** [https://universitydashboard-production.up.railway.app](https://universitydashboard-production.up.railway.app)

## Example API Endpoint

- **Backend (Express.js):** `GET /subjects?page=1&limit=10` (pagination supported)
- API response status: 204 (No Content)
- Supported HTTP methods: GET, POST, PUT, DELETE, OPTIONS
- **CORS (Frontend-Backend Integration):**
    - Allowed Origin: https://university-dashboard-black.vercel.app
    - Allow Credentials: true
    - Allowed Headers: Content-Type, Authorization

## HTTP/OPTIONS Details

- **Request Headers (Browser, Frontend):**
    - Accept: */*
    - Accept-Encoding: gzip, deflate, br, zstd
    - Accept-Language: tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7
    - Access-Control-Request-Headers: content-type
    - Access-Control-Request-Method: GET
    - Connection: keep-alive
    - DNT: 1
    - Host: universitydashboard-production.up.railway.app
    - Origin: https://university-dashboard-black.vercel.app
    - Priority: u=4
    - Referer: https://university-dashboard-black.vercel.app/
    - Sec-Fetch-Dest: empty
    - Sec-Fetch-Mode: cors
    - Sec-Fetch-Site: cross-site
    - Sec-GPC: 1
    - User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:149.0) Gecko/20100101 Firefox/149.0

- **Response Headers (Backend, Express.js):**
    - access-control-allow-credentials: true
    - access-control-allow-headers: Content-Type,Authorization
    - access-control-allow-methods: GET,POST,PUT,DELETE,OPTIONS
    - access-control-allow-origin: https://university-dashboard-black.vercel.app
    - date: Thu, 02 Apr 2026 10:25:06 GMT
    - server: railway-edge
    - vary: Origin
    - x-cache: MISS
    - x-cache-hits: 0
    - X-Firefox-Spdy: h2
    - x-powered-by: Express
    - x-railway-cdn-edge: fastly/cache-vie6383-VIE
    - x-railway-edge: railway/europe-west4-drams3a
    - x-railway-request-id: 5uikWbVpTL2AZ9GM8Hk9cQ
    - x-served-by: cache-vie6383-VIE

---

## Features

- **Frontend (React, Refine, shadcn/ui, Tailwind CSS, TypeScript, Zod):** Interactive course UI with reusable, type-safe components
- **Backend (Node.js, Express.js, Drizzle ORM, Neon PostgreSQL):** Handles course listing, addition, and updates
- **Authentication & Security (Arcjet, Better Auth):** Provides JWT-based authentication, rate limiting, bot protection, and secure account management
- **Media Management (Cloudinary):** Handles optimized storage, upload, and delivery of course media assets

---

## Usage

1. **Git (Repository Management):** Clone the repository:
   ```bash
   git clone https://github.com/kybrakorkmaz/UniversityDashboard.git
   cd university-dashboard
2. Backend (Node.js, Express.js, Drizzle ORM): Install dependencies and start the server:
    ```bash
    cd backend
    npm install
    npm run dev
3. Frontend (React, Refine, shadcn/ui, Tailwind CSS, TypeScript): Install dependencies and start the development server:
    ```bash 
    cd frontend
    npm install
    npm run dev
4. Open the frontend URL in your browser to use the application
## Deployment Notes
- Frontend (React, Refine): Some fetch requests may fail due to deployment configurations; this will be updated in the development process
- Backend (Express.js, Arcjet, Better Auth): Handles allowed headers, methods, and preflight (OPTIONS) requests for CORS
## Dev Tools
- CodeRabbit: AI-powered code review for automated, contextual pull request feedback
- Site24x7: Monitoring solution for uptime, performance, and server metrics
## Learning Goals
- Frontend (Refine): Understand data flow and component-driven architecture with refine
- Backend (Drizzle ORM, Arcjet, Better Auth): Practice CRUD, authentication, security, and CORS management
- **Dev Tools (CodeRabbit, Junie, Site24x7)**: Learn automated code quality checks and application monitoring
## Reference / Resources
- **YouTube Tutorial:** [University Dashboard Full Tutorial](https://www.youtube.com/watch?v=ek7hmv5PVV8&t=11845s)
- **React Documentation:** [React Official Docs](https://reactjs.org/docs/getting-started.html)
- **Refine Documentation:** [Refine Docs](https://refine.dev/docs/)
- **Tailwind CSS Documentation:** [Tailwind Docs](https://tailwindcss.com/docs/installation)