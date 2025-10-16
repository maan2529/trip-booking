# Frontend Application Documentation

## Overview

This React + Vite application delivers the user experience for the PSQURE travel booking platform. It integrates with the backend REST API to support authentication, trip discovery, seat selection, booking management, and ticket visualization. Styling combines TailwindCSS utilities with custom CSS modules for polished layouts.

```
Repo Root
└── frontend/
    ├── index.html            # Vite entry HTML
    ├── package.json          # Scripts & dependencies
    ├── public/
    │   ├── qrCode.jpeg       # Static QR image rendered in tickets
    │   └── vite.svg          # Default Vite icon
    └── src/
        ├── main.jsx          # React root render + Toast container
        ├── App.jsx           # App shell + BrowserRouter
        ├── config.js         # Frontend configuration (API base URL)
        ├── axios/            # Axios instance & interceptors
        ├── routes/           # Route definitions (React Router v7)
        ├── layouts/          # Shared layout wrappers
        ├── context/          # AuthContext provider
        ├── components/       # Reusable UI components
        ├── pages/            # Page-level views
        ├── style/            # Page-specific CSS (e.g., `MyBookings.css`)
        └── utils/            # Helpers such as `formatSeats.js`
```

## Tech Stack

- **Framework**: React 19 with React Router 7
- **Build Tool**: Vite 7 with HMR
- **Styling**: TailwindCSS 4 + custom CSS
- **Icons**: `lucide-react`, `react-icons`
- **HTTP Client**: `axios` via `src/axios/axios.js`
- **State/Context**: React Context API (`src/context/AuthContext.jsx`)
- **Notifications**: `react-toastify`
- **Utilities**: `html2canvas` for ticket downloads, seat formatting helpers

## Prerequisites

- Node.js 18+ and npm 9+
- Running backend service (default `http://localhost:3000`)

## Environment Configuration

API endpoints are defined in `src/config.js`. Update `BASE_URL` to match the backend API root (e.g., `http://localhost:3000/api/v1`). Adjust this value for staging or production builds.

## Installation & Scripts

```bash
cd frontend
npm install

# Start Vite dev server (http://localhost:5173)
npm run dev

# Production build output to dist/
npm run build

# Preview the production build locally
npm run preview

# Run ESLint
npm run lint
```

## Application Architecture

- `main.jsx` mounts `App` with `<BrowserRouter>` and initializes `ToastContainer` for alerts.
- `App.jsx` wraps the route tree and ensures flex layout across the viewport.
- `routes/AppRoutes.jsx` defines public/auth routes and wraps protected sections with `MainLayout`.
- `AuthContext` manages user session data retrieved from `/auth/profile`.

### Layouts

- `layouts/MainLayout.jsx` composes shared chrome (e.g., `Navbar`, `Footer`) for authenticated pages.

### Key Pages

- `pages/LoginPage.jsx`, `pages/SignupPage.jsx`: Forms that integrate with `/api/v1/auth` endpoints.
- `pages/HomePage.jsx`: Landing experience with hero sections, featured trips, and search entry points.
- `components/BookingPage.jsx`: Trip discovery, filters, and seat selection flow.
- `pages/CheckoutPage.jsx`: Fare breakdown and passenger confirmation before booking.
- `pages/BookingConfirmation.jsx`: Post-booking summary with print-ready ticket (`/public/qrCode.jpeg`).
- `pages/ViewTicket.jsx`: Detailed ticket view plus PNG download via `html2canvas`.
- `pages/MyBookings.jsx`: Upcoming/past bookings fetched from `/bookings/bookings`.
- `pages/Profile.jsx` and `pages/ProfilePage.jsx`: Overview and management forms for user profile data.
- `components/admin/AdminDashboard.jsx`: Admin analytics, trip management, and booking tables.

### Reusable Components

- `Navbar.jsx`, `Footer.jsx`: Global navigation and footer elements.
- `SearchBar.jsx`, `TripCard.jsx`: Trip listing widgets reused across pages.
- Admin-specific widgets under `components/admin/` (e.g., `TripForm.jsx`, `TripTabel.jsx`).
- Utility components such as `ProfileHeader.jsx`, `Popup.jsx`, and `ProtectedRoute.jsx`.

### Styling

- Tailwind directives are declared in `src/index.css` via the `@tailwindcss/vite` preset.
- Page-specific styles (e.g., bookings) live in `src/style/`.
- Components blend Tailwind utilities with custom CSS classes for responsive layouts.

## Axios Configuration

`src/axios/axios.js` exports the shared Axios instance:

- Sets `baseURL` from `config.js`.
- Enables `withCredentials` for cookie-based auth.
- Response interceptors display toast notifications and surface API errors consistently.

Ensure backend CORS allows `http://localhost:5173` with credentials enabled.

## Ticket Download & Printing

- `ViewTicket.jsx` captures the ticket DOM via `html2canvas` and downloads a PNG file.
- `BookingConfirmation.jsx` opens a print-focused window containing the ticket markup for PDF export or printing.

## Authentication Flow

- Successful login/register calls set an httpOnly JWT cookie.
- `AuthContext` fetches `/auth/profile` to hydrate user state used by protected routes.
- Navigation guards within `AppRoutes.jsx` redirect unauthenticated users to `/` (login).

## Development Tips

- Keep backend and frontend base URLs aligned to prevent CORS issues.
- Use browser dev tools or the React Developer Tools extension when integrating new flows.
- When adding routes, register them in `AppRoutes.jsx` and update navigation links in `Navbar.jsx` if necessary.
- Update `public/qrCode.jpeg` to customize ticket QR branding.

## Testing & QA

- Automated tests are not yet configured. Recommended additions include React Testing Library for unit tests and Cypress for end-to-end coverage.
- Manual regression checklist:
  - Authenticate via signup/login flows.
  - Search for trips, reserve seats, and complete checkout.
  - Validate ticket rendering, downloads, and print flow.
  - Confirm admin dashboard widgets load correctly with admin credentials.

## Deployment Notes

- Update `src/config.js` with production API URLs before invoking `npm run build`.
- Serve the contents of `dist/` via static hosting (Vercel, Netlify, Nginx, etc.).
- Use HTTPS in production to protect cookie-based authentication.

## Future Enhancements

- Introduce client-side form validation (e.g., React Hook Form + Yup).
- Implement skeleton loaders and optimistic updates for bookings.
- Add PWA/offline support for ticket access without connectivity.
