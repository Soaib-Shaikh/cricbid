import React from "react";
import {
  Trophy,
  Wallet,
  UserCircle2,
} from "lucide-react";

const BidPanel = ({
  currentBid,
  highestBidder,
}) => {
  const teamLogo =
    highestBidder?.logo ||
    highestBidder?.teamLogo ||
    null;

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shrink-0">
          <Trophy size={24} />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Current Highest Bid
          </p>

          <h1 className="text-4xl font-black text-green-600 mt-1">
            ₹ {currentBid?.toLocaleString() || 0}
          </h1>
        </div>
      </div>

      {highestBidder ? (
        <div className="mt-5 bg-[#F5F7FB] rounded-2xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500 mb-3">
            Leading Team
          </p>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border flex items-center justify-center shrink-0 p-2">
              {teamLogo ? (
                <img
                  src={teamLogo}
                  alt={highestBidder?.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <UserCircle2
                  size={32}
                  className="text-gray-400"
                />
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-black text-gray-900 leading-tight break-words">
                {highestBidder?.name || "Unknown Team"}
              </h2>

              <div className="flex items-center gap-2 mt-2 text-green-600">
                <Wallet size={16} />

                <span className="font-bold">
                  ₹ {highestBidder?.remaining?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 bg-[#F5F7FB] rounded-2xl p-5 text-center text-gray-500">
          No bids yet
        </div>
      )}
    </div>
  );
};

export default BidPanel;