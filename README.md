# PSQURE Travel Platform
## Demo Link - https://trip-booking-x1lh.onrender.com
## Overview

Full-stack travel booking application built with a React + Vite frontend and an Express/MongoDB backend. Features include user authentication, trip search, seat selection, booking management, ticket viewing/downloading, and an admin dashboard for trip oversight.

```
Repo Root
├── backend/    # REST API (Node.js, Express, MongoDB)
└── frontend/   # React SPA (Vite, TailwindCSS)
```

## Prerequisites

- Node.js 18+ and npm 9+
- MongoDB instance (local or hosted)

## Environment Setup

Create `.env` inside `backend/`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/psqure
JWT_SECRET=replace_with_secure_secret
NODE_ENV=development
```

Frontend API base URL lives in `frontend/src/config.js` (`BASE_URL`). Ensure it matches your backend (e.g., `http://localhost:3000/api/v1`).

## Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Development Workflow

Start backend with Nodemon:

```bash
cd backend
npm run dev
```

Launch frontend dev server:

```bash
cd frontend
npm run dev
```

Frontend serves on `http://localhost:5173`; backend listens on `http://localhost:3000` by default.

## Production Build

```bash
# Backend (run with process manager / Node)
cd backend
npm start

# Frontend build output in frontend/dist/
cd ../frontend
npm run build
```

Deploy the frontend `dist/` folder on a static host (Vercel, Netlify, Nginx, etc.) and point it to the live backend API.

## Backend Highlights

- Express 5 with modular routes under `backend/src/routes/`
- Mongoose models for `User`, `Trip`, and `Booking`
- JWT authentication stored in httpOnly cookies (`login`, `register`, `logout`, `profile` routes)
- Trip CRUD endpoints with admin guard (`/api/v1/trips`)
- Booking endpoints for seat reservation, cancellation, and listing (`/api/v1/bookings`)
- Global error handling via `ApiError`/`errorHandler`

## Frontend Highlights

- React Router v7 routing in `frontend/src/routes/AppRoutes.jsx`
- Auth context manages user sessions retrieved from `/auth/profile`
- Booking flow covers search (`BookingPage`), checkout, confirmation, and ticket view
- Ticket downloads via `html2canvas` and printable view for confirmations
- Admin dashboard under `frontend/src/components/admin/`
- TailwindCSS-based design with supplemental custom CSS

## Testing & QA

- Automated tests not yet configured; consider adding React Testing Library and backend integration tests.
- Manual checklist:
  - Register/login users
  - Search trips and complete booking
  - Download/print tickets
  - Access admin dashboard with admin account

## Future Enhancements

- Add validation layers (express-validator, form validation on frontend)
- Introduce automated testing suites
- Implement payment gateway integration
- Enhance admin analytics and reporting
