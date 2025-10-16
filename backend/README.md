# Backend Service Documentation

## Overview

This backend powers the PSQURE travel application. It exposes RESTful APIs for user authentication, trip management, and booking workflows. The service is built with **Node.js**, **Express 5**, and **MongoDB** (via **Mongoose**) and uses cookie-based JWT authentication.

```
Repo Root
└── backend/
    ├── server.js              # Entry point – boots Express after DB connection
    ├── src/
    │   ├── app.js             # Express app configuration
    │   ├── config/            # Environment + MongoDB connectors
    │   ├── controllers/       # Route handlers
    │   ├── middleware/        # Auth guards
    │   ├── models/            # Mongoose schemas
    │   ├── routes/            # API route definitions
    │   └── utils/             # ApiError, ApiResponse, async handler, error middleware
    └── package.json           # Scripts and dependencies
```

## Tech Stack

- **Runtime**: Node.js (ESM modules)
- **Framework**: Express 5
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT stored in httpOnly cookies (`jsonwebtoken`, `cookie-parser`)
- **Validation & Helpers**: `express-validator` (available), `asyncHandler`, `ApiError` utilities

## Prerequisites

- Node.js 18+ and npm 9+
- MongoDB instance (local or remote)
- `.env` file providing required environment variables (see below)

## Environment Variables

Create a `.env` file in `backend/` based on the following keys:

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | No (defaults to `3000`) | Port for the Express server. |
| `MONGO_URI` | **Yes** | Connection string for MongoDB. |
| `NODE_ENV` | No (defaults to `development`) | Runtime environment flag. |
| `JWT_SECRET` | **Yes** | Secret key used to sign JWT tokens. |

## Installation & Scripts

```bash
cd backend
npm install

# Development with Nodemon
npm run dev

# Production start
npm start
```

## Express App Configuration

- JSON body parsing (`express.json()`)
- Cookie parsing (`cookie-parser`)
- CORS enabled for `http://localhost:5173` with credentials support
- Base API prefix: `/api/v1`
- Centralized error handling via `src/utils/errorHandler.js`

## Authentication Model

JWT tokens are set as httpOnly cookies (`token`).

- `isUser` middleware verifies token presence and attaches `req.user`.
- `isAdmin` middleware verifies token **and** `role === 'admin'`.

## Data Models (Mongoose)

### User (`src/models/user.model.js`)
- Fields: `name`, `email` (unique), `password` (hashed), optional contact info, `role` (`user` | `admin`).
- Timestamps enabled.

### Trip (`src/models/trip.model.js`)
- Fields: `from`, `to`, `date`, `time`, `price`, `totalSeats`, `availableSeats` (array of numbers), metadata (`oldPrice`, `duration`, `rating`, etc.).
- Indexes on `from`, `to`, and `date` for efficient search.

### Booking (`src/models/booking.model.js`)
- References `trip` and `user`.
- Stores `seats`, `status`, `paymentInfo`, timestamps, and computed `bookingDate`.

## API Reference

All responses use the shared `ApiResponse` wrapper:

```json
{
  "statusCode": 200,
  "data": { /* payload */ },
  "message": "Human readable message"
}
```

### Auth Routes (`/api/v1/auth`)

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/register` | Public | Register a new user (`name`, `email`, `password`, optional `role`). |
| `POST` | `/login` | Public | Authenticate user; issues JWT cookie. |
| `GET` | `/profile` | `isUser` | Fetch profile of authenticated user. |
| `POST` | `/logout` | `isUser` | Clear authentication cookie. |

> Admin-specific profile route helpers exist in `auth.controller.js` but are not currently wired via router.

### Trip Routes (`/api/v1/trips`)

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/create` | `isAdmin` | Create a new trip (generates `availableSeats`). |
| `GET` | `/` | Public | List trips; supports query params `from`, `to`, `date`. |
| `GET` | `/get/:id` | Public | Retrieve trip by ID. |
| `PUT` | `/edit/:id` | `isAdmin` | Update trip details. |
| `DELETE` | `/delete/:id` | `isAdmin` | Delete a trip. |
| `GET` | `/admin` | `isAdmin` | Fetch all trips for admin dashboard. |

### Booking Routes (`/api/v1/bookings`)

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/:tripId` | `isUser` | Create booking for a trip (locks selected seats). |
| `GET` | `/bookings` | `isUser` | Retrieve current user bookings (returns upcoming & past). |
| `GET` | `/:tripId/seats` | `isUser` | Get already-booked seats for a trip. |
| `GET` | `/singlebooking/:id` | `isUser` | Retrieve a specific booking with trip & user detail. |
| `GET` | `/admin/bookings` | `isAdmin` | List all bookings (populated with user + trip). |
| `PUT` | `/bookings/:id/cancel` | `isAdmin` | Cancel booking and release seats back to trip. |

> Booking creation runs inside a MongoDB transaction session to ensure seat allocation consistency.

## Controllers & Business Logic

- `auth.controller.js`: handles registration, login, profile fetch, logout. Uses bcrypt hashing and JWT signing.
- `trip.controller.js`: CRUD operations for trips and admin listing.
- `booking.controller.js`: transactional booking creation, user/admin listing, cancellation, and seat lookup.

## Utilities

- `asyncHandler`: Wraps route handlers to forward rejections.
- `ApiError`: Standard error class consumed by global error handler.
- `ApiResponse`: Consistent JSON response wrapper.
- `errorHandler`: Terminal middleware converting thrown `ApiError`s into HTTP responses.

## Sample Requests

### Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "StrongPassword123"
  }' \
  -c cookies.txt
```

### Create Trip (Admin)

```bash
curl -X POST http://localhost:3000/api/v1/trips/create \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "from": "Pune",
    "to": "Bhopal",
    "date": "2025-10-22",
    "time": "2025-10-22T15:00:00Z",
    "price": 50,
    "totalSeats": 60
  }'
```

### Book Seats (User)

```bash
curl -X POST http://localhost:3000/api/v1/bookings/68ef23454bcf84e5b6fca936 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "seats": [4, 5],
    "paymentMethod": "mock"
  }'
```

## Error Handling

- Throw `ApiError(statusCode, message)` within controllers/utilities.
- Unhandled errors are captured by `errorHandler`, which sends consistent JSON responses.
- Validation failures use HTTP 400 (`ApiError`). Authentication failures return 401/403.

## Development Tips

- Ensure MongoDB is reachable before running `npm run dev`.
- JWT cookies are marked httpOnly; use a REST client that supports cookies when hitting protected routes.
- Adjust CORS origin in `src/app.js` if the frontend host/port changes.

## Future Enhancements

- Add input validation middleware (`express-validator`) per route.
- Implement payment confirmation and status updates in bookings.
- Add automated tests (`npm test`) when ready.

