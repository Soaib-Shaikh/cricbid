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
  const player =
    auctionData?.player || {};

  return (
    <div className="h-full bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-cyan-400/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-yellow-500/10 blur-3xl rounded-full" />

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between mb-6">

        <div className="bg-cyan-500/15 border border-cyan-300/20 px-4 py-3 rounded-2xl">
          <span className="text-cyan-200 font-black text-sm">
            PLAYER SPOTLIGHT
          </span>
        </div>

        <div className="bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-4 py-3 rounded-2xl flex items-center gap-2 font-black text-xs shadow-lg">
          <Trophy size={14} />
          STAR PLAYER
        </div>

      </div>

      {/* IMAGE */}
      <div className="relative z-10 flex justify-center">

        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.35)]">

          {player?.image ? (
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <UserCircle2
                size={90}
                className="text-gray-500"
              />
            </div>
          )}

        </div>

      </div>

      {/* NAME */}
      <div className="relative z-10 text-center mt-6">

        <h2 className="text-4xl font-black text-white leading-tight break-words">
          {player?.name || "No Player"}
        </h2>

        <p className="text-cyan-300 font-bold mt-3 text-xl">
          {player?.role || "N/A"}
        </p>

      </div>

      {/* DETAILS */}
      <div className="relative z-10 grid grid-cols-2 gap-4 mt-6">

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

          <div className="flex items-center gap-2 mb-3">
            <Shield
              size={15}
              className="text-cyan-300"
            />

            <span className="text-gray-400 text-xs uppercase tracking-wider">
              Batting
            </span>
          </div>

          <h3 className="text-white font-bold text-lg leading-8">
            {player?.battingStyle || "N/A"}
          </h3>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-5">

          <div className="flex items-center gap-2 mb-3">
            <Zap
              size={15}
              className="text-red-300"
            />

            <span className="text-gray-400 text-xs uppercase tracking-wider">
              Bowling
            </span>
          </div>

          <h3 className="text-white font-bold text-lg leading-8">
            {player?.bowlingStyle || "N/A"}
          </h3>

        </div>

      </div>

      {/* BASE PRICE */}
      <div className="relative z-10 mt-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-5 shadow-[0_0_25px_rgba(249,115,22,0.35)]">

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