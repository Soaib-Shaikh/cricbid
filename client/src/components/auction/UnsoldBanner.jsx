import React from "react";
import {
  XCircle,
  AlertTriangle,
} from "lucide-react";

const UnsoldBanner = ({
  unsoldData,
}) => {
  const player =
    unsoldData?.player;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-red-100 text-red-700 px-6 py-4 rounded-2xl font-black">
          <XCircle size={22} />
          PLAYER UNSOLD
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* PLAYER */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6">
          <div className="h-[400px] rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm">
            <img
              src={player?.image}
              alt={player?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* INFO */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col justify-center">

          <h2 className="text-5xl font-black text-slate-900">
            {player?.name}
          </h2>

          <p className="text-red-500 font-bold text-2xl mt-4">
            {player?.role}
          </p>

          <div className="mt-8 bg-red-50 border border-red-200 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle
                size={22}
                className="text-red-500"
              />

              <h3 className="font-black text-red-700 text-lg">
                No Winning Bid
              </h3>
            </div>

            <p className="text-red-600 leading-7 font-medium">
              No team placed a winning bid.
              This player can be re-listed
              in the next auction round.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UnsoldBanner;