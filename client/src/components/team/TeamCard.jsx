import React from "react";
import {
  Wallet,
  Users,
  Zap,
} from "lucide-react";

const TeamCard = ({
  team,
  onBid,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3">

      <div className="flex flex-col items-center text-center">

        <div className="w-16 h-16 bg-gray-50 rounded-2xl border p-2 flex items-center justify-center">
          <img
            src={team.logo}
            alt={team.name}
            className="w-full h-full object-contain"
          />
        </div>

        <h2 className="text-sm font-black text-gray-900 mt-2 leading-tight">
          {team.name}
        </h2>

        <div className="mt-2 text-green-600 flex items-center gap-1 text-xs">
          <Wallet size={12} />
          ₹ {team.remaining}
        </div>

        <div className="mt-1 text-blue-600 flex items-center gap-1 text-xs">
          <Users size={12} />
          {team.players?.length || 0}
        </div>

        <button
          onClick={() => onBid(team)}
          className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1"
        >
          <Zap size={14} />
          BID
        </button>

      </div>

    </div>
  );
};

export default TeamCard;