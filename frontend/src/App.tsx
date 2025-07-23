import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAppSelector } from "./store/hooks";

import "./App.css";

const App = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <main className="py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/leaderboard" replace />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/admin" replace /> : <LoginPage />
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
