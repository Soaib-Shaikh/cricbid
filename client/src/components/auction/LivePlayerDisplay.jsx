import React from "react";
import {
  Trophy,
  UserCircle2,
  BadgeIndianRupee,
  Shield,
  Zap,
} from "lucide-react";

const LivePlayerDisplay = ({
  auctionData,
}) => {
  const { player } =
    auctionData || {};

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-cyan-950/95 border border-cyan-400/10 backdrop-blur-3xl rounded-3xl p-6 shadow-[0_0_60px_rgba(0,0,0,0.5)] h-full">

      {/* GLOW BG */}
      <div className="absolute -top-20 -right-20 w-52 h-52 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-yellow-400/10 blur-3xl rounded-full" />

      {/* TOP */}
      <div className="relative flex items-center justify-between mb-6">

        <div className="bg-cyan-500/15 border border-cyan-300/20 px-5 py-3 rounded-2xl shadow-lg">
          <span className="text-cyan-200 font-black text-sm tracking-wide">
            PLAYER SPOTLIGHT
          </span>
        </div>

        <div className="bg-gradient-to-r from-yellow-300 to-amber-500 text-black px-4 py-3 rounded-2xl flex items-center gap-2 font-black text-xs shadow-xl">
          <Trophy size={15} />
          STAR PLAYER
        </div>

      </div>

      {/* IMAGE */}
      <div className="relative flex justify-center">

        <div className="absolute w-56 h-56 rounded-full bg-cyan-400/10 blur-2xl animate-pulse" />

        <div className="relative w-52 h-52 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.35)]">

          {player?.image ? (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <UserCircle2
                size={100}
                className="text-gray-500"
              />
            </div>
          )}

        </div>

      </div>

      {/* NAME */}
      <div className="relative text-center mt-6">

        <h2 className="text-4xl font-black text-white tracking-tight">
          {player?.name || "No Player"}
        </h2>

        <p className="text-cyan-300 font-bold mt-2 text-lg">
          {player?.role || "N/A"}
        </p>

      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield
              size={16}
              className="text-cyan-300"
            />
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Batting
            </p>
          </div>

          <h3 className="text-white font-bold text-sm leading-6">
            {player?.battingStyle || "N/A"}
          </h3>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap
              size={16}
              className="text-red-300"
            />
            <p className="text-gray-400 text-xs uppercase tracking-wider">
              Bowling
            </p>
          </div>

          <h3 className="text-white font-bold text-sm leading-6">
            {player?.bowlingStyle || "N/A"}
          </h3>
        </div>

      </div>

      {/* BASE PRICE */}
      <div className="relative mt-7 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-6 shadow-[0_0_30px_rgba(251,146,60,0.35)]">

        <div className="flex items-center justify-center gap-2">
          <BadgeIndianRupee
            size={22}
            className="text-white"
          />

          <span className="text-white text-sm font-black uppercase tracking-widest">
            Base Price
          </span>
        </div>

        <h3 className="text-5xl font-black text-white text-center mt-4">
          ₹ {player?.basePrice || 0}
        </h3>

      </div>

    </div>
  );
};

export default LivePlayerDisplay;