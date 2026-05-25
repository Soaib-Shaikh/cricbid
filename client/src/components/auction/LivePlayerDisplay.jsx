import React from "react";
import {
  Trophy,
  UserCircle2,
  BadgeIndianRupee,
  Target,
  Shield,
  Star,
} from "lucide-react";

const LivePlayerDisplay = ({
  auctionData,
}) => {
  const { player } =
    auctionData;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 h-full">

      {/* TOP */}
      <div className="flex items-center justify-between mb-6">

        <div className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-2xl font-bold text-sm">
          PLAYER SPOTLIGHT
        </div>

        <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-2xl flex items-center gap-2 font-black text-xs">
          <Star size={14} />
          FEATURED
        </div>

      </div>

      {/* PLAYER IMAGE */}
      <div className="flex justify-center">
        <div className="w-full h-[380px] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-50 to-cyan-50 border border-gray-200 shadow-md p-4 flex items-center justify-center">

          {player?.image ? (
            <img
              src={player.image}
              alt={player.name}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <UserCircle2
                size={100}
                className="text-gray-400"
              />
            </div>
          )}

        </div>
      </div>

      {/* NAME */}
      <div className="text-center mt-6">
        <h2 className="text-4xl font-black text-slate-900">
          {player.name}
        </h2>

        <p className="text-cyan-600 font-bold text-lg mt-2">
          {player.role}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 text-center">
          <Target
            size={20}
            className="mx-auto text-cyan-500"
          />

          <p className="text-xs uppercase text-slate-500 mt-3">
            Batting
          </p>

          <h3 className="font-black text-slate-900 mt-2">
            {player.battingStyle || "N/A"}
          </h3>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 text-center">
          <Shield
            size={20}
            className="mx-auto text-purple-500"
          />

          <p className="text-xs uppercase text-slate-500 mt-3">
            Bowling
          </p>

          <h3 className="font-black text-slate-900 mt-2">
            {player.bowlingStyle || "N/A"}
          </h3>
        </div>

      </div>

      {/* PRICE */}
      <div className="mt-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 shadow-lg text-center">

        <div className="flex justify-center items-center gap-2">
          <BadgeIndianRupee
            size={20}
            className="text-white"
          />

          <span className="text-white uppercase font-bold text-sm">
            Base Price
          </span>
        </div>

        <h2 className="text-5xl font-black text-white mt-4">
          ₹ {player.basePrice?.toLocaleString()}
        </h2>

      </div>

    </div>
  );
};

export default LivePlayerDisplay;