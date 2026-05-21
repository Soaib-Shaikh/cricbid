import React from "react";
import {
  Trophy,
  Crown,
  BadgeIndianRupee,
  Sparkles,
} from "lucide-react";

const SoldBanner = ({
  soldData,
}) => {
  const {
    player,
    team,
    price,
  } = soldData || {};

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-950/90 via-slate-900/95 to-amber-950/90 border border-yellow-400/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(250,204,21,0.15)]">

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-52 h-52 bg-yellow-400/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-8">

        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-6 py-4 rounded-3xl font-black shadow-2xl">
          <Trophy size={24} />
          PLAYER SOLD
          <Sparkles size={20} />
        </div>

      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">

        {/* PLAYER */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.2)]">
              <img
                src={player?.image}
                alt={player?.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="text-gray-400 text-xs uppercase tracking-[4px]">
                Winning Player
              </p>

              <h2 className="text-4xl font-black text-white mt-3 break-words">
                {player?.name}
              </h2>

              <p className="text-yellow-300 font-bold text-lg mt-3">
                {player?.role}
              </p>
            </div>

          </div>

        </div>

        {/* TEAM + PRICE */}
        <div className="space-y-5">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">
              <Crown
                size={24}
                className="text-yellow-300"
              />

              <h3 className="text-3xl font-black text-white">
                {team?.name}
              </h3>
            </div>

            <p className="text-gray-400">
              Winning Team
            </p>

          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/10 border border-green-400/20 rounded-3xl p-6 shadow-xl">

            <div className="flex items-center gap-3">
              <BadgeIndianRupee
                size={24}
                className="text-green-300"
              />

              <span className="text-green-200 font-black uppercase tracking-widest text-sm">
                Final Price
              </span>
            </div>

            <h1 className="text-6xl font-black text-green-300 mt-5">
              ₹ {price}
            </h1>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SoldBanner;