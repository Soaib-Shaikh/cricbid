import {
  Routes,
  Route,
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Teams from "../pages/admin/Teams";
import Players from "../pages/admin/Players";
import Auction from "../pages/admin/Auction";
import CreateTournament from "../pages/admin/CreateTournament";
import CreateTeam from "../pages/admin/CreateTeam";
import Tournaments from "../pages/admin/Tournaments";
import TeamPlayers from "../pages/admin/TeamPlayers";
import AuctionHistory from "../pages/admin/AuctionHistory";
import EditTournament from "../pages/admin/EditTournament";
import UnsoldPlayers from "../pages/admin/UnsoldPlayers";

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>

        <Route
          path="/create-tournament"
          element={
            <CreateTournament />
          }
        />

        <Route
          path="/edit-tournament/:tournamentId"
          element={
            <EditTournament />
          }
        />

        <Route
          path="/create-team"
          element={
            <CreateTeam />
          }
        />

        <Route
          path="/tournaments"
          element={
            <Tournaments />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />

        <Route
          path="/teams"
          element={<Teams />}
        />

        <Route
          path="/players"
          element={
            <Players />
          }
        />

        <Route
          path="/auction"
          element={
            <Auction />
          }
        />

        <Route
          path="/unsold-players"
          element={
            <UnsoldPlayers />
          }
        />

        <Route
          path="/team-players/:teamId"
          element={
            <TeamPlayers />
          }
        />

        <Route
          path="/auction-history"
          element={
            <AuctionHistory />
          }
        />

      </Routes>
    </AdminLayout>
  );
}