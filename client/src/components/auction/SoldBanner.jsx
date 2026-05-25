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
  } = soldData;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-yellow-100 text-yellow-700 px-6 py-4 rounded-2xl font-black">
          <Trophy size={22} />
          PLAYER SOLD
          <Sparkles size={18} />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* PLAYER */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 flex flex-col items-center">

          <div className="w-44 h-44 rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-4xl font-black text-slate-900 mt-6">
            {player.name}
          </h2>

          <p className="text-cyan-600 font-bold mt-2">
            {player.role}
          </p>

        </div>

        {/* TEAM */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col justify-center text-center">

          <div className="flex justify-center items-center gap-3">
            <Crown
              size={24}
              className="text-yellow-500"
            />

            <h3 className="text-3xl font-black text-slate-900">
              {team.name}
            </h3>
          </div>

          <div className="mt-8 bg-green-50 border border-green-200 rounded-3xl p-8">

            <div className="flex justify-center items-center gap-2">
              <BadgeIndianRupee
                size={20}
                className="text-green-600"
              />

              <span className="text-green-700 font-bold uppercase text-sm">
                Final Price
              </span>
            </div>

            <h1 className="text-6xl font-black text-green-600 mt-5">
              ₹ {price?.toLocaleString()}
            </h1>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SoldBanner;