import React from "react";
import {
  Crown,
  Wallet,
  Users,
  Trophy,
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
    <div className="h-full bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">

      {/* BG GLOW */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />

      {/* HEADER */}
      <div className="relative z-10 mb-6">

        <div className="flex items-center gap-3">
          <Trophy
            size={28}
            className="text-yellow-300"
          />

          <h2 className="text-3xl font-black text-white">
            Team War Room
          </h2>
        </div>

        <p className="text-gray-400 text-sm mt-2">
          Live bidding teams leaderboard
        </p>

      </div>

      {/* TEAM LIST */}
      <div className="relative z-10 space-y-4 max-h-[620px] overflow-y-auto pr-2">

        {teams?.length > 0 ? (
          teams.map((team, index) => {
            const isHighest =
              highestBidder ===
              team._id;

            return (
              <div
                key={team._id}
                className={`rounded-3xl p-5 border transition-all duration-300 ${
                  isHighest
                    ? "bg-gradient-to-r from-yellow-400/20 to-orange-500/10 border-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.2)] scale-[1.02]"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >

                <div className="flex items-center gap-4">

                  {/* RANK */}
                  <div className="w-10 h-10 rounded-2xl bg-black/30 flex items-center justify-center text-white font-black">
                    #{index + 1}
                  </div>

                  {/* LOGO */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-slate-800 shadow-lg">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-white font-black text-lg truncate max-w-[160px]">
                        {team.name}
                      </h3>

                      {isHighest && (
                        <div className="bg-gradient-to-r from-yellow-300 to-orange-500 text-black px-3 py-2 rounded-2xl flex items-center gap-2 font-black text-[10px] shadow-lg">
                          <Crown size={12} />
                          LEADING
                        </div>
                      )}

                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-4 mt-4">

                      <div className="bg-green-500/10 border border-green-400/20 rounded-2xl p-3 flex items-center gap-2">
                        <Wallet
                          size={16}
                          className="text-green-300"
                        />
                        <div>
                          <p className="text-gray-400 text-[10px] uppercase">
                            Budget
                          </p>
                          <p className="text-green-300 font-bold text-sm">
                            ₹ {team.remaining}
                          </p>
                        </div>
                      </div>

                      <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-3 flex items-center gap-2">
                        <Users
                          size={16}
                          className="text-cyan-300"
                        />
                        <div>
                          <p className="text-gray-400 text-[10px] uppercase">
                            Players
                          </p>
                          <p className="text-cyan-300 font-bold text-sm">
                            {team.players?.length || 0}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center py-24 text-gray-400">
            No teams available
          </div>
        )}

      </div>

    </div>
  );
};

export default LiveAuctionTeams;