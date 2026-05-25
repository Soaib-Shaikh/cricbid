import React from "react";
import {
  Crown,
  Wallet,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";

const LiveAuctionTeams = ({
  highestBidder,
}) => {
  const { teams } = useSelector(
    (state) => state.team
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-4 h-full">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Team War Room
          </h2>
          <p className="text-slate-500 text-xs">
            Live Bidding Teams
          </p>
        </div>

        <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-black">
          {teams?.length || 0}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3 max-h-[650px] overflow-y-auto pr-1">
        {teams?.map((team) => {
          const isHighest =
            String(highestBidder?._id) ===
            String(team._id);

          return (
            <div
              key={team._id}
              className={`relative rounded-2xl p-3 transition-all duration-300 ${isHighest
                ? "bg-amber-50 border border-yellow-300 shadow-md"
                : "bg-white border border-slate-200 shadow-sm hover:shadow-md"
                }`}
            >
              {/* LEADING BADGE */}
              {isHighest && (
                <div className="flex justify-center mb-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3 py-1 rounded-full flex items-center gap-1 text-[8px] font-black shadow-sm">
                    <Crown size={8} />
                    LEADING BID
                  </div>
                </div>
              )}

              {/* TEAM NAME */}
              <h3 className="text-center text-slate-900 font-black text-sm truncate mt-1">
                {team.name}
              </h3>

              {/* LOGO */}
              <div className="flex justify-center mt-3 mb-4">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* STATS */}
              <div className="flex gap-2">
                <div className="flex-1 bg-emerald-50 rounded-xl px-2 py-2 text-center">
                  <Wallet
                    size={10}
                    className="mx-auto text-emerald-600"
                  />

                  <p className="text-[7px] uppercase font-bold text-emerald-500 mt-1">
                    Budget
                  </p>

                  <p className="text-[11px] font-black text-emerald-700 mt-1">
                    ₹ {team.remaining?.toLocaleString()}
                  </p>
                </div>

                <div className="flex-1 bg-cyan-50 rounded-xl px-2 py-2 text-center">
                  <Users
                    size={10}
                    className="mx-auto text-cyan-600"
                  />

                  <p className="text-[7px] uppercase font-bold text-cyan-500 mt-1">
                    Players
                  </p>

                  <p className="text-[11px] font-black text-cyan-700 mt-1">
                    {team.players?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveAuctionTeams;