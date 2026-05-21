import React from "react";
import {
  Trophy,
  BadgeIndianRupee,
  UserCircle2,
} from "lucide-react";

const PlayerCard = ({
  player,
  currentBid,
}) => {
  if (!player) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-lg h-[620px] flex flex-col items-center justify-center">

        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <UserCircle2
            size={50}
            className="text-green-500"
          />
        </div>

        <h2 className="text-3xl font-black text-gray-800 mt-6">
          Search Player To Start
        </h2>

        <p className="text-gray-500 mt-3 text-lg">
          Select player and begin live auction
        </p>

      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

      {/* TOP */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-5 flex items-center justify-between">

        <div>
          <p className="text-green-100 text-sm uppercase tracking-wider">
            Live Auction Player
          </p>

          <h2 className="text-3xl font-black text-white mt-1">
            {player.name}
          </h2>
        </div>

        <div className="bg-white/20 text-white px-5 py-3 rounded-2xl font-bold text-lg">
          #{player.index}
        </div>

      </div>

      {/* IMAGE */}
      <div className="h-[320px] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">

        <img
          src={player.image}
          alt={player.name}
          className="max-h-full max-w-full object-contain"
        />

      </div>

      {/* DETAILS */}
      <div className="p-6">

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">
              Role
            </p>

            <h3 className="text-xl font-black text-gray-900 mt-2">
              {player.role}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <p className="text-gray-500 text-sm">
              Batting
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-2">
              {player.battingStyle}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 col-span-2">
            <p className="text-gray-500 text-sm">
              Bowling Style
            </p>

            <h3 className="text-lg font-bold text-gray-900 mt-2">
              {player.bowlingStyle}
            </h3>
          </div>

        </div>

        {/* BID */}
        <div className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <Trophy className="text-white" />

              <span className="text-white font-bold text-lg">
                Current Bid
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BadgeIndianRupee className="text-white" />

              <h2 className="text-5xl font-black text-white">
                {currentBid}
              </h2>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PlayerCard;