import React from "react";
import {
  Trophy,
  Crown,
  BadgeIndianRupee,
} from "lucide-react";

const SoldBanner = ({
  soldData,
}) => {
  const {
    player,
    team,
    price,
  } = soldData;

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

      <div className="text-center mb-8">

        <div className="inline-flex items-center gap-3 bg-yellow-400 text-black px-5 py-3 rounded-2xl font-black shadow-xl">

          <Trophy size={20} />

          PLAYER SOLD

        </div>

      </div>

      <div className="grid grid-cols-2 gap-8 items-center">

        {/* PLAYER */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-5">

          <div className="w-32 h-32 rounded-3xl overflow-hidden border border-white/10">

            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
            />

          </div>

          <div>

            <p className="text-gray-400 text-xs uppercase tracking-[3px]">
              Player
            </p>

            <h2 className="text-3xl font-black text-white mt-3">
              {player.name}
            </h2>

            <p className="text-red-300 font-bold mt-2">
              {player.role}
            </p>

          </div>

        </div>

        {/* TEAM */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <Crown
              size={22}
              className="text-yellow-300"
            />

            <h3 className="text-2xl font-black text-white">
              {team.name}
            </h3>

          </div>

          <div className="bg-green-500/15 border border-green-400/20 rounded-3xl p-5">

            <div className="flex items-center gap-2">

              <BadgeIndianRupee
                size={22}
                className="text-green-300"
              />

              <span className="text-green-200 font-bold">
                Final Price
              </span>

            </div>

            <h1 className="text-5xl font-black text-green-300 mt-4">
              ₹ {price}
            </h1>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SoldBanner;