import React from "react";
import {
  Trophy,
  UserCircle2,
  BadgeIndianRupee,
} from "lucide-react";

const LivePlayerDisplay = ({
  auctionData,
}) => {
  const { player } =
    auctionData;

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl h-full">

      {/* TOP */}
      <div className="flex items-center justify-between mb-5">

        <div className="bg-cyan-500/15 border border-cyan-300/20 px-4 py-2 rounded-2xl">
          <span className="text-cyan-200 font-bold text-sm">
            PLAYER SPOTLIGHT
          </span>
        </div>

        <div className="bg-yellow-400 text-black px-3 py-2 rounded-2xl flex items-center gap-2 font-black text-xs">
          <Trophy size={14} />
          STAR
        </div>

      </div>

      {/* IMAGE */}
      <div className="flex justify-center">

        <div className="w-48 h-48 rounded-3xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.35)]">

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

      {/* INFO */}
      <div className="text-center mt-5">

        <h2 className="text-3xl font-black text-white">
          {player.name}
        </h2>

        <p className="text-cyan-300 font-semibold mt-2">
          {player.role}
        </p>

      </div>

      {/* PLAYER DETAILS */}
      <div className="grid grid-cols-1 gap-3 mt-5">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Batting Style
          </p>

          <h3 className="text-white font-bold mt-2 text-sm">
            {player.battingStyle || "N/A"}
          </h3>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Bowling Style
          </p>

          <h3 className="text-white font-bold mt-2 text-sm">
            {player.bowlingStyle || "N/A"}
          </h3>
        </div>

      </div>

      {/* BASE PRICE */}
      <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-5 shadow-xl">

        <div className="flex items-center justify-center gap-2">

          <BadgeIndianRupee
            size={22}
            className="text-white"
          />

          <span className="text-white text-sm font-bold uppercase tracking-wide">
            Base Price
          </span>

        </div>

        <h3 className="text-4xl font-black text-white text-center mt-3">
          ₹ {player.basePrice}
        </h3>

      </div>

    </div>
  );
};

export default LivePlayerDisplay;