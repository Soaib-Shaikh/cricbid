import React from "react";
import {
  XCircle,
} from "lucide-react";

const UnsoldBanner = ({
  unsoldData,
}) => {
  const player =
    unsoldData?.player;

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

      <div className="text-center mb-8">

        <div className="inline-flex items-center gap-3 bg-red-500 text-white px-5 py-3 rounded-2xl font-black shadow-xl">

          <XCircle size={20} />

          PLAYER UNSOLD

        </div>

      </div>

      <div className="grid grid-cols-2 gap-8 items-center">

        {/* IMAGE */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="h-[300px] rounded-3xl overflow-hidden border border-white/10">

            <img
              src={player?.image}
              alt={player?.name}
              className="w-full h-full object-cover"
            />

          </div>

        </div>

        {/* INFO */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <p className="text-gray-400 text-xs uppercase tracking-[3px]">
            Auction Result
          </p>

          <h2 className="text-4xl font-black text-white mt-4">
            {player?.name}
          </h2>

          <p className="text-red-300 font-bold text-xl mt-4">
            {player?.role}
          </p>

          <div className="mt-8 bg-red-500/15 border border-red-400/20 rounded-3xl p-5">

            <p className="text-red-200 font-semibold leading-7">
              No winning bid received in this round.
              This player can be re-listed later.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UnsoldBanner;