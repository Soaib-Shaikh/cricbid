import React from "react";
import {
  Radio,
  Trophy,
  Clock3,
  XCircle,
} from "lucide-react";

const AuctionStatus = ({
  status,
}) => {
  if (status === "live") {
    return (
      <div className="flex items-center gap-3 bg-red-500/15 border border-red-400/20 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl">

        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />

        <Radio
          size={18}
          className="text-red-300"
        />

        <span className="font-black text-red-200 text-sm tracking-wide">
          LIVE
        </span>

      </div>
    );
  }

  if (status === "sold") {
    return (
      <div className="flex items-center gap-3 bg-yellow-500/15 border border-yellow-300/20 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl">

        <Trophy
          size={18}
          className="text-yellow-300"
        />

        <span className="font-black text-yellow-200 text-sm tracking-wide">
          SOLD
        </span>

      </div>
    );
  }

  if (status === "unsold") {
    return (
      <div className="flex items-center gap-3 bg-red-900/20 border border-red-400/20 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl">

        <XCircle
          size={18}
          className="text-red-300"
        />

        <span className="font-black text-red-200 text-sm tracking-wide">
          UNSOLD
        </span>

      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-300/20 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-xl">

      <Clock3
        size={18}
        className="text-cyan-300"
      />

      <span className="font-black text-cyan-200 text-sm tracking-wide">
        WAITING
      </span>

    </div>
  );
};

export default AuctionStatus;