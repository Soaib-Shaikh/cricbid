import React from "react";
import {
  Trophy,
  UserCircle2,
  BadgeIndianRupee,
} from "lucide-react";

const LivePlayerDisplay = ({
  auctionData,
}) => {
  const player =
    auctionData?.player || {};

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 border border-cyan-400/10 rounded-3xl p-6 shadow-2xl h-full overflow-hidden">

      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full" />

      {/* TOP */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="bg-cyan-500/15 border border-cyan-300/20 px-4 py-2 rounded-2xl">
          <span className="text-cyan-200 font-bold text-sm">
            PLAYER SPOTLIGHT
          </span>
        </div>

        <div className="bg-gradient-to-r from-yellow-300 to-amber-500 text-black px-4 py-2 rounded-2xl flex items-center gap-2 font-black text-xs">
          <Trophy size={14} />
          STAR
        </div>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center relative z-10">
        <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-cyan-400 shadow-[0_0_35px_rgba(34,211,238,0.35)]">
          {player.image ? (
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

      {/* INFO */}
      <div className="text-center mt-6 relative z-10">
        <h2 className="text-4xl font-black text-white break-words">
          {player.name || "No Player"}
        </h2>

        <p className="text-cyan-300 font-semibold mt-2 text-lg">
          {player.role || "N/A"}
        </p>
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-2 gap-4 mt-6 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Batting
          </p>

          <h3 className="text-white font-bold mt-2 text-sm">
            {player.battingStyle || "N/A"}
          </h3>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Bowling
          </p>

          <h3 className="text-white font-bold mt-2 text-sm">
            {player.bowlingStyle || "N/A"}
          </h3>
        </div>
      </div>

      {/* BASE PRICE */}
      <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-5 shadow-xl relative z-10">
        <div className="flex items-center justify-center gap-2">
          <BadgeIndianRupee
            size={22}
            className="text-white"
          />

          <span className="text-white text-sm font-bold uppercase tracking-wide">
            Base Price
          </span>
        </div>

        <h3 className="text-5xl font-black text-white text-center mt-3">
          ₹ {player.basePrice || 0}
        </h3>
      </div>
    </div>
  );
};

export default LivePlayerDisplay;