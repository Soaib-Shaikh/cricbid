import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Users,
  Shield,
  Gavel,
  IndianRupee,
  XCircle,
  CheckCircle2,
  Crown,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const { selectedTournament } = useSelector(
    (state) => state.tournament
  );

  const { teams } = useSelector(
    (state) => state.team
  );

  const { players } = useSelector(
    (state) => state.player
  );

  // CALCULATIONS
  const soldPlayers =
    players?.filter(
      (p) => p.status === "sold"
    ) || [];

  const unsoldPlayers =
    players?.filter(
      (p) => p.status === "unsold"
    ) || [];

  const totalRevenue =
    soldPlayers.reduce(
      (sum, player) =>
        sum + player.soldPrice,
      0
    );

  const highestSoldPlayer =
    soldPlayers.length > 0
      ? soldPlayers.reduce(
          (max, player) =>
            player.soldPrice >
            max.soldPrice
              ? player
              : max
        )
      : null;

  const recentPlayers =
    [...players]
      .reverse()
      .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 rounded-3xl p-8 shadow-xl overflow-hidden relative">

        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">

          <div>

            <p className="text-green-100 uppercase tracking-wider text-sm font-semibold">
              Active Tournament
            </p>

            <h1 className="text-4xl lg:text-5xl font-black text-white mt-3">
              {
                selectedTournament?.tournamentName ||
                "No Tournament Selected"
              }
            </h1>

            <div className="flex flex-wrap gap-4 mt-5">

              <div className="bg-white/20 px-4 py-2 rounded-2xl text-white font-medium">
                📍 {selectedTournament?.city}
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-2xl text-white font-medium">
                🏟️ {selectedTournament?.groundName}
              </div>

              <div className="bg-white/20 px-4 py-2 rounded-2xl text-white font-medium">
                🏏 {selectedTournament?.overs} Overs
              </div>

            </div>

          </div>

          <img
            src={selectedTournament?.logo}
            alt="tournament"
            className="w-36 h-36 rounded-3xl object-cover border-4 border-white shadow-xl"
          />

        </div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

        <button
          onClick={() => navigate("/create-team")}
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4"
        >

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
            <Shield size={26} />
          </div>

          <div className="text-left">
            <h3 className="font-bold text-gray-900">
              Add Team
            </h3>
            <p className="text-sm text-gray-500">
              Register new team
            </p>
          </div>

        </button>

        <button
          onClick={() => navigate("/add-player")}
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4"
        >

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <Plus size={26} />
          </div>

          <div className="text-left">
            <h3 className="font-bold text-gray-900">
              Add Player
            </h3>
            <p className="text-sm text-gray-500">
              Register auction player
            </p>
          </div>

        </button>

        <button
          onClick={() => navigate("/auction")}
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex items-center gap-4"
        >

          <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600">
            <Gavel size={26} />
          </div>

          <div className="text-left">
            <h3 className="font-bold text-gray-900">
              Start Auction
            </h3>
            <p className="text-sm text-gray-500">
              Begin live bidding
            </p>
          </div>

        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

        <StatCard
          icon={<Shield size={28} />}
          color="bg-blue-100 text-blue-600"
          title="Teams"
          value={teams?.length}
        />

        <StatCard
          icon={<Users size={28} />}
          color="bg-green-100 text-green-600"
          title="Players"
          value={players?.length}
        />

        <StatCard
          icon={<CheckCircle2 size={28} />}
          color="bg-emerald-100 text-emerald-600"
          title="Sold"
          value={soldPlayers.length}
        />

        <StatCard
          icon={<XCircle size={28} />}
          color="bg-red-100 text-red-600"
          title="Unsold"
          value={unsoldPlayers.length}
        />

      </div>

      {/* SECOND ROW */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* REVENUE */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600">
              <IndianRupee size={28} />
            </div>

            <div>
              <p className="text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-3xl font-black text-gray-900">
                ₹ {totalRevenue}
              </h2>
            </div>

          </div>

        </div>

        {/* AUCTION STATUS */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 animate-pulse">
              <Trophy size={28} />
            </div>

            <div>
              <p className="text-gray-500">
                Auction Status
              </p>

              <h2 className="text-2xl font-black text-red-600">
                LIVE
              </h2>
            </div>

          </div>

        </div>

        {/* HIGHEST SOLD */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Crown size={28} />
            </div>

            <div>
              <p className="text-gray-500">
                Highest Sold
              </p>

              <h2 className="text-xl font-black text-gray-900">
                {
                  highestSoldPlayer
                    ?.name || "N/A"
                }
              </h2>

              <p className="text-purple-600 font-semibold mt-1">
                ₹ {
                  highestSoldPlayer
                    ?.soldPrice || 0
                }
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* RECENT PLAYERS */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm mt-8 overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <h2 className="text-2xl font-black text-gray-900">
            Recent Players 🏏
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="text-left p-4 text-gray-600">
                  Player
                </th>

                <th className="text-left p-4 text-gray-600">
                  Role
                </th>

                <th className="text-left p-4 text-gray-600">
                  Status
                </th>

                <th className="text-left p-4 text-gray-600">
                  Sold Price
                </th>
              </tr>

            </thead>

            <tbody>

              {
                recentPlayers.map(
                  (player) => (
                    <tr
                      key={player._id}
                      className="border-t"
                    >

                      <td className="p-4 font-semibold text-gray-900">
                        {player.name}
                      </td>

                      <td className="p-4 text-gray-600">
                        {player.role}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            player.status ===
                            "sold"
                              ? "bg-green-100 text-green-700"
                              : player.status ===
                                "unsold"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {player.status}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-gray-900">
                        ₹ {
                          player.soldPrice
                        }
                      </td>

                    </tr>
                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

const StatCard = ({
  icon,
  color,
  title,
  value,
}) => (
  <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">

    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
      {icon}
    </div>

    <h2 className="text-3xl font-black text-gray-900 mt-5">
      {value}
    </h2>

    <p className="text-gray-500 mt-2">
      {title}
    </p>

  </div>
);

export default Dashboard;