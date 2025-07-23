# Relax App - Leaderboard

A web application featuring a public leaderboard and a password protected admin dashboard for managing player scores.

## Features

- **Public Leaderboard**: Displays the top 10 players sorted by score. Includes real-time refresh functionality.
- **Admin Dashboard**: A secure area for administrators to manage the player list.
- **Protected Route**: Access is guarded by a password (`admin123`).
- **Full CRUD Operations**: Admins can Add, View, Edit (scores), and Delete players.
- **Inline Editing**: Quickly update player scores directly in the table.
- **Form Validation**: Ensures data integrity for new players and score updates.

## Folder Structure

The project is a monorepo with a separate frontend and backend.

```
.
├── backend/
│   ├── controllers/
│   │   └── playerController.js   # Core logic to handle player data
│   ├── middleware/
│   │   └── validation.js         # Express validation middleware
│   ├── routes/
│   │   └── playerRoutes.js       # API route definitions
│   └── server.js                 # Main Express server entry point
│
└── frontend/
    └── src/
        ├── components/       # Reusable React components (AdminTable, PlayerForm, etc.)
        ├── pages/            # Page components (AdminPage, LeaderboardPage, LoginPage)
        ├── services/         # apiService.ts for backend communication
        ├── types/            # Shared TypeScript type definitions (Player.ts)
        ├── utils/            # Helper functions (formatDate, validation, etc.)
        ├── App.tsx           # Main component with routing setup
        ├── main.tsx          # Application entry point
        ├── store/
        │   ├── authSlice.ts          # Auth slice for login state
        │   ├── playersSlice.ts       # Slice managing players and leaderboard
        │   ├── hooks.ts              # Typed Redux hooks
        │   └── store.ts              # Redux store setup
```

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **CORS**: For enabling Cross Origin Resource Sharing.
- **Helmet**: For securing Express apps by setting various HTTP headers.
- **express-rate-limit**: For basic rate limiting to prevent abuse.
- **express-validator**: For server side data validation.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Redux Toolkit**: Simplifies managing the state using Redux.
- **React Redux**: For global state management.
- **Vite**: Next generation frontend tooling for fast development.
- **React Router DOM**: For client side routing.
- **Tailwind CSS**: A utility first CSS framework for rapid UI development.
- **Lucide React**: A library of simply beautiful and consistent icons.

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Node.js (20.19+, 22.12+ or later recommended)
- npm or yarn

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory.

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

The backend server will start on `http://localhost:3001`.

### 2. Frontend Setup

Open a second terminal and navigate to the `frontend` directory.

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend development server will start, typically on `http://localhost:5173`.

### 3. Usage

1.  Open your web browser and go to `http://localhost:5173`.
2.  You will see the **Leaderboard** page.
3.  Click on the **Admin** tab in the navigation bar.
4.  You will be prompted to log in. Use the password: `admin123`.
5.  Upon successful login, you will be redirected to the **Admin Dashboard**, where you can manage players.
