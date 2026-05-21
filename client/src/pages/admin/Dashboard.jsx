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
  Share2,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const { selectedTournament } =
    useSelector(
      (state) =>
        state.tournament
    );

  const { teams } =
    useSelector(
      (state) =>
        state.team
    );

  const { players } =
    useSelector(
      (state) =>
        state.player
    );

  const soldPlayers =
    players?.filter(
      (p) =>
        p.status === "sold"
    ) || [];

  const unsoldPlayers =
    players?.filter(
      (p) =>
        p.status === "unsold"
    ) || [];

  const totalRevenue =
    soldPlayers.reduce(
      (
        sum,
        player
      ) =>
        sum +
        (player.soldPrice ||
          0),
      0
    );

  const highestSoldPlayer =
    soldPlayers.length > 0
      ? soldPlayers.reduce(
        (
          max,
          player
        ) =>
          (player.soldPrice ||
            0) >
            (max.soldPrice ||
              0)
            ? player
            : max
      )
      : null;

  const recentPlayers =
    [
      ...(players ||
        []),
    ]
      .reverse()
      .slice(0, 5);

  const handleShare =
    async () => {
      if (
        !selectedTournament?.tournamentId
      ) {
        alert(
          "Select tournament first"
        );
        return;
      }

      const liveLink = `${window.location.origin}/live/${selectedTournament.tournamentId}`;

      await navigator.clipboard.writeText(
        liveLink
      );

      alert(
        "Live link copied 🔗"
      );
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 p-6">

      {/* TOP HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Welcome Back 👋
          </h1>

          <p className="text-slate-500 mt-2 text-lg">
            Manage your cricket auction professionally
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-2">
            <Activity
              size={18}
              className="text-red-500 animate-pulse"
            />
            <span className="font-bold text-slate-800">
              Auction Live
            </span>
          </div>

          <button
            onClick={
              handleShare
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 font-bold transition"
          >
            <Share2
              size={18}
            />
            Share Live
          </button>

        </div>

      </div>

      {/* HERO */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT HERO */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl p-8 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-2xl font-bold">
              <Sparkles
                size={16}
              />
              ACTIVE TOURNAMENT
            </div>

            <h2 className="text-5xl font-black text-slate-900 mt-6 leading-tight">
              {selectedTournament?.tournamentName ||
                "No Tournament"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <InfoBadge
                icon={
                  <MapPin
                    size={16}
                  />
                }
                text={
                  selectedTournament?.city ||
                  "N/A"
                }
              />

              <InfoBadge
                icon={
                  <Building2
                    size={16}
                  />
                }
                text={
                  selectedTournament?.groundName ||
                  "N/A"
                }
              />

              <InfoBadge
                text={`🏏 ${selectedTournament?.overs ||
                  0
                  } Overs`}
              />

              <InfoBadge
                text={
                  selectedTournament?.tournamentId ||
                  "No ID"
                }
              />

            </div>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() =>
                  navigate(
                    "/auction"
                  )
                }
                className="bg-gradient-to-r from-emerald-600 to-green-500 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                Start Auction
                <ArrowUpRight
                  size={18}
                />
              </button>

              <button
                onClick={() =>
                  navigate(
                    "/create-team"
                  )
                }
                className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-4 rounded-2xl font-bold transition"
              >
                Add Team
              </button>

            </div>

          </div>

        </div>

        {/* RIGHT HERO */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl p-8 flex items-center justify-center">

          {selectedTournament?.logo ? (
            <img
              src={
                selectedTournament.logo
              }
              alt="tournament"
              className="w-full max-w-[380px] h-[380px] object-cover rounded-[32px] shadow-2xl border-8 border-white"
            />
          ) : (
            <div className="w-full h-[380px] rounded-[32px] bg-slate-100 flex items-center justify-center text-slate-500 text-2xl font-bold">
              No Tournament Poster
            </div>
          )}

        </div>

      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <StatCard
          icon={
            <Shield
              size={26}
            />
          }
          title="Teams"
          value={
            teams?.length || 0
          }
          color="emerald"
        />

        <StatCard
          icon={
            <Users
              size={26}
            />
          }
          title="Players"
          value={
            players?.length ||
            0
          }
          color="blue"
        />

        <StatCard
          icon={
            <CheckCircle2
              size={26}
            />
          }
          title="Sold"
          value={
            soldPlayers.length
          }
          color="green"
        />

        <StatCard
          icon={
            <XCircle
              size={26}
            />
          }
          title="Unsold"
          value={
            unsoldPlayers.length
          }
          color="red"
        />

      </div>
      {/* ANALYTICS */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* REVENUE */}
        <PremiumCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium">
                Total Revenue
              </p>

              <h2 className="text-4xl font-black text-slate-900 mt-3">
                ₹ {totalRevenue}
              </h2>

              <p className="text-emerald-600 font-semibold mt-3">
                Auction earnings
              </p>
            </div>

            <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <IndianRupee size={28} />
            </div>
          </div>
        </PremiumCard>

        {/* HIGHEST SOLD */}
        <PremiumCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium">
                Highest Sold
              </p>

              <h2 className="text-2xl font-black text-slate-900 mt-3">
                {highestSoldPlayer?.name || "N/A"}
              </h2>

              <p className="text-amber-600 font-bold mt-3">
                ₹ {highestSoldPlayer?.soldPrice || 0}
              </p>
            </div>

            <div className="w-16 h-16 rounded-3xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Trophy size={28} />
            </div>
          </div>
        </PremiumCard>

        {/* STATUS */}
        <PremiumCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 font-medium">
                Auction Status
              </p>

              <h2 className="text-3xl font-black text-slate-900 mt-3">
                LIVE
              </h2>

              <p className="text-red-500 font-semibold mt-3">
                Running now
              </p>
            </div>

            <div className="w-16 h-16 rounded-3xl bg-red-100 flex items-center justify-center text-red-600">
              <Activity
                size={28}
                className="animate-pulse"
              />
            </div>
          </div>
        </PremiumCard>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10">
        <h2 className="text-3xl font-black text-slate-900 mb-6">
          Quick Actions ⚡
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <ActionCard
            icon={<Shield size={28} />}
            title="Create Team"
            desc="Register new team"
            onClick={() =>
              navigate("/create-team")
            }
          />

          <ActionCard
            icon={<Plus size={28} />}
            title="Add Player"
            desc="Add auction player"
            onClick={() =>
              navigate("/players")
            }
          />

          <ActionCard
            icon={<Gavel size={28} />}
            title="Live Auction"
            desc="Start bidding"
            onClick={() =>
              navigate("/auction")
            }
          />

          <ActionCard
            icon={<Share2 size={28} />}
            title="Share Link"
            desc="Public live stream"
            onClick={handleShare}
          />

        </div>
      </div>

      {/* RECENT PLAYERS */}
      <div className="mt-10">
        <h2 className="text-3xl font-black text-slate-900 mb-6">
          Recent Players 🏏
        </h2>

        <div className="grid gap-5">

          {recentPlayers.length > 0 ? (
            recentPlayers.map(
              (player) => (
                <div
                  key={player._id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >

                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      {player.name}
                    </h3>

                    <p className="text-slate-500 mt-2">
                      {player.role}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`px-5 py-3 rounded-2xl font-bold ${player.status ===
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
                  </div>

                  <div className="text-right">
                    <p className="text-slate-500">
                      Sold Price
                    </p>

                    <h2 className="text-2xl font-black text-slate-900 mt-2">
                      ₹ {player.soldPrice || 0}
                    </h2>
                  </div>

                </div>
              )
            )
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-700">
                No players added yet
              </h3>

              <p className="text-slate-500 mt-3">
                Start adding players for auction
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

/* COMPONENTS */

const InfoBadge = ({
  icon,
  text,
}) => (
  <div className="bg-slate-100 rounded-2xl px-4 py-4 flex items-center gap-2 font-semibold text-slate-700">
    {icon}
    {text}
  </div>
);

const PremiumCard = ({
  children,
}) => (
  <div className="bg-white rounded-[28px] border border-slate-200 shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition-all">
    {children}
  </div>
);

const StatCard = ({
  icon,
  title,
  value,
  color,
}) => {
  const colors = {
    emerald:
      "bg-emerald-100 text-emerald-600",
    blue:
      "bg-blue-100 text-blue-600",
    green:
      "bg-green-100 text-green-600",
    red:
      "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-[28px] border border-slate-200 shadow-lg p-6 hover:shadow-2xl hover:-translate-y-2 transition-all">

      <div
        className={`w-16 h-16 rounded-3xl flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>

      <h2 className="text-4xl font-black text-slate-900 mt-5">
        {value}
      </h2>

      <p className="text-slate-500 mt-2 font-medium">
        {title}
      </p>

    </div>
  );
};

const ActionCard = ({
  icon,
  title,
  desc,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="bg-white rounded-[28px] border border-slate-200 shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all text-left"
  >

    <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-slate-700">
      {icon}
    </div>

    <h3 className="text-2xl font-black text-slate-900 mt-6">
      {title}
    </h3>

    <p className="text-slate-500 mt-3">
      {desc}
    </p>

  </button>
);

export default Dashboard;