import React from "react";
import {
  Clock3,
  UserCircle2,
} from "lucide-react";

const LiveBidHistory = ({
  bidHistory,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-5 flex items-center justify-between">
        <h2 className="text-2xl font-black text-white">
          Live Bid History
        </h2>

        <div className="bg-white/20 text-white px-4 py-2 rounded-2xl font-bold">
          {bidHistory.length} Bids
        </div>
      </div>

      <div className="p-6">
        {bidHistory.length > 0 ? (
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {bidHistory
              .slice()
              .reverse()
              .map((bid, index) => (
                <div
                  key={index}
                  className="bg-gray-50 border rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white border p-2 flex items-center justify-center">
                      {bid?.team?.logo ? (
                        <img
                          src={bid.team.logo}
                          alt={bid.team.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <UserCircle2
                          size={30}
                          className="text-gray-400"
                        />
                      )}
                    </div>

                    <div>
                      <h3 className="font-black text-gray-900">
                        {bid?.team?.name || "Unknown Team"}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-500 mt-1">
                        <Clock3 size={14} />
                        <span className="text-sm">
                          placed a bid
                        </span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-black text-green-600">
                    ₹ {bid.amount?.toLocaleString()}
                  </h2>
                </div>
              ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-3xl p-12 text-center border">
            <p className="text-gray-500 text-lg">
              No bids placed yet 🏏
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveBidHistory;