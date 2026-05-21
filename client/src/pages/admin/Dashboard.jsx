// Premium upgraded Dashboard.jsx
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
  MapPin,
  Building2,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { selectedTournament } = useSelector((state) => state.tournament);
  const { teams } = useSelector((state) => state.team);
  const { players } = useSelector((state) => state.player);

  const soldPlayers = players?.filter((p) => p.status === "sold") || [];
  const unsoldPlayers = players?.filter((p) => p.status === "unsold") || [];

  const totalRevenue = soldPlayers.reduce(
    (sum, player) => sum + (player.soldPrice || 0),
    0
  );

  const highestSoldPlayer =
    soldPlayers.length > 0
      ? soldPlayers.reduce((max, player) =>
          (player.soldPrice || 0) > (max.soldPrice || 0) ? player : max
        )
      : null;

  const recentPlayers = [...(players || [])].reverse().slice(0, 6);

  const actions = [
    {
      title: "Add Team",
      desc: "Register new team",
      icon: <Shield size={24} />,
      color: "bg-emerald-100 text-emerald-600",
      path: "/create-team",
    },
    {
      title: "Add Player",
      desc: "Register auction player",
      icon: <Plus size={24} />,
      color: "bg-blue-100 text-blue-600",
      path: "/players",
    },
    {
      title: "Start Auction",
      desc: "Begin live bidding",
      icon: <Gavel size={24} />,
      color: "bg-amber-100 text-amber-600",
      path: "/auction",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-lime-500 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-12 -right-10 w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-2xl font-semibold">
              <Activity size={16} className="animate-pulse" /> LIVE TOURNAMENT
            </div>

            <h1 className="text-4xl lg:text-5xl font-black text-white mt-5">
              {selectedTournament?.tournamentName || "No Tournament Selected"}
            </h1>

            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-white/20 px-4 py-3 rounded-2xl text-white flex items-center gap-2">
                <MapPin size={16} /> {selectedTournament?.city || "N/A"}
              </div>
              <div className="bg-white/20 px-4 py-3 rounded-2xl text-white flex items-center gap-2">
                <Building2 size={16} /> {selectedTournament?.groundName || "N/A"}
              </div>
              <div className="bg-white/20 px-4 py-3 rounded-2xl text-white">
                🏏 {selectedTournament?.overs || 0} Overs
              </div>
            </div>
          </div>

          {selectedTournament?.logo ? (
            <img
              src={selectedTournament.logo}
              alt="tournament"
              className="w-36 h-36 rounded-3xl object-cover border-4 border-white shadow-2xl"
            />
          ) : (
            <div className="w-36 h-36 rounded-3xl bg-white/20 flex items-center justify-center text-white font-bold">
              No Logo
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => navigate(action.path)}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-4"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${action.color}`}>
              {action.icon}
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-900 text-lg">{action.title}</h3>
              <p className="text-slate-500 text-sm">{action.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatCard icon={<Shield size={26} />} title="Teams" value={teams?.length || 0} color="bg-blue-100 text-blue-600" />
        <StatCard icon={<Users size={26} />} title="Players" value={players?.length || 0} color="bg-emerald-100 text-emerald-600" />
        <StatCard icon={<CheckCircle2 size={26} />} title="Sold" value={soldPlayers.length} color="bg-green-100 text-green-600" />
        <StatCard icon={<XCircle size={26} />} title="Unsold" value={unsoldPlayers.length} color="bg-red-100 text-red-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <InfoCard icon={<IndianRupee size={26} />} title="Total Revenue" value={`₹ ${totalRevenue}`} color="bg-yellow-100 text-yellow-600" />
        <InfoCard icon={<Trophy size={26} />} title="Auction Status" value="LIVE" color="bg-red-100 text-red-600" />
        <InfoCard icon={<Crown size={26} />} title="Highest Sold" value={highestSoldPlayer?.name || "N/A"} sub={`₹ ${highestSoldPlayer?.soldPrice || 0}`} color="bg-purple-100 text-purple-600" />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm mt-8 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-2xl font-black text-slate-900">Recent Players 🏏</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 text-slate-600">Player</th>
                <th className="text-left p-4 text-slate-600">Role</th>
                <th className="text-left p-4 text-slate-600">Status</th>
                <th className="text-left p-4 text-slate-600">Sold Price</th>
              </tr>
            </thead>
            <tbody>
              {recentPlayers.length > 0 ? recentPlayers.map((player) => (
                <tr key={player._id} className="border-t hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold text-slate-900">{player.name}</td>
                  <td className="p-4 text-slate-600">{player.role}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      player.status === "sold"
                        ? "bg-green-100 text-green-700"
                        : player.status === "unsold"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-slate-900">₹ {player.soldPrice || 0}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-slate-500">
                    No players available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <h2 className="text-3xl font-black text-slate-900 mt-5">{value}</h2>
    <p className="text-slate-500 mt-2">{title}</p>
  </div>
);

const InfoCard = ({ icon, title, value, sub, color }) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition">
    <div className="flex items-center gap-4">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500">{title}</p>
        <h2 className="text-2xl font-black text-slate-900">{value}</h2>
        {sub && <p className="font-semibold mt-1 text-slate-600">{sub}</p>}
      </div>
    </div>
  </div>
);

export default Dashboard;
