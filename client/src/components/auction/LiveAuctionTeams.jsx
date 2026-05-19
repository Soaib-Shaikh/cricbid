import React from "react";
import {
  Crown,
  Wallet,
  Users,
} from "lucide-react";

import {
  useSelector,
} from "react-redux";

const LiveAuctionTeams = ({
  highestBidder,
}) => {
  const { teams } =
    useSelector(
      (state) =>
        state.team
    );

  return (
    <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl h-full">

      {/* HEADER */}
      <div className="mb-5">

        <h2 className="text-2xl font-black text-white">
          Team War Room
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Live bidding teams
        </p>

      </div>

      {/* TEAM LIST */}
      <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">

        {teams?.length > 0 ? (
          teams.map((team) => {
            const isHighest =
              highestBidder ===
              team._id;

            return (
              <div
                key={team._id}
                className={`rounded-2xl p-4 border transition-all duration-300 ${
                  isHighest
                    ? "bg-yellow-400/15 border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.25)] scale-[1.01]"
                    : "bg-black/20 border-white/10 hover:bg-white/10"
                }`}
              >

                <div className="flex items-center gap-4">

                  {/* LOGO */}
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-slate-800">

                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* INFO */}
                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-white font-black text-base truncate max-w-[130px]">
                        {team.name}
                      </h3>

                      {isHighest && (
                        <div className="bg-yellow-400 text-black px-3 py-1 rounded-xl flex items-center gap-1 font-black text-[10px]">
                          <Crown size={12} />
                          LEADING
                        </div>
                      )}

                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3">

                      <div className="flex items-center gap-2 text-green-300 text-xs font-semibold">
                        <Wallet size={14} />
                        ₹ {team.remaining}
                      </div>

                      <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                        <Users size={14} />
                        {team.players?.length || 0}
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-20 text-gray-400">
            No teams loaded
          </div>
        )}

      </div>

    </div>
  );
};

export default LiveAuctionTeams;