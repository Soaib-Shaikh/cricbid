import React from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import PlayerRegistration from "./pages/PlayerRegistration";
import LiveAuction from "./pages/LiveAuction";
import PublicLiveAuction from "./pages/PublicLiveAuction";

const App = () => {
  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/player-register/:tournamentId"
        element={
          <PlayerRegistration />
        }
      />

      {/* PUBLIC VIEWER */}
      <Route
        path="/live/:tournamentId"
        element={
          <PublicLiveAuction />
        }
      />

      {/* OLD */}
      <Route
        path="/live-auction"
        element={
          <LiveAuction />
        }
      />

      {/* ADMIN */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;