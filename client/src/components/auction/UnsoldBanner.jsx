import React from "react";
import {
  XCircle,
  AlertTriangle,
  UserCircle2,
} from "lucide-react";

const UnsoldBanner = ({
  unsoldData,
}) => {
  const player =
    unsoldData?.player || {};

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-red-950/90 via-slate-900/95 to-black border border-red-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.12)]">

      {/* BG GLOW */}
      <div className="absolute top-0 right-0 w-52 h-52 bg-red-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full" />

      {/* HEADER */}
      <div className="relative z-10 text-center mb-8">

        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-4 rounded-3xl font-black shadow-2xl">
          <XCircle size={22} />
          PLAYER UNSOLD
        </div>

      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">

        {/* PLAYER IMAGE */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

          <div className="h-[320px] rounded-3xl overflow-hidden border border-white/10 shadow-xl">

            {player?.image ? (
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover opacity-80"
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
        <div className="space-y-5">

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <p className="text-gray-400 text-xs uppercase tracking-[4px]">
              Auction Result
            </p>

            <h2 className="text-5xl font-black text-white mt-4 break-words">
              {player?.name || "Unknown"}
            </h2>

            <p className="text-red-300 font-bold text-2xl mt-4">
              {player?.role || "N/A"}
            </p>

          </div>

          <div className="bg-red-500/10 border border-red-400/20 rounded-3xl p-6">

            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle
                size={22}
                className="text-red-300"
              />

              <span className="text-red-200 font-black uppercase tracking-widest text-sm">
                No Winning Bid
              </span>
            </div>

            <p className="text-gray-300 leading-8 text-lg">
              No team placed a successful bid for this player in this auction round.
              This player can be re-listed later.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UnsoldBanner;