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
  const configs = {
    live: {
      icon: Radio,
      text: "LIVE AUCTION",
      classes:
        "from-green-500/20 to-emerald-500/10 border-green-400/20 text-green-200",
      pulse: true,
    },

    sold: {
      icon: Trophy,
      text: "PLAYER SOLD",
      classes:
        "from-yellow-400/20 to-orange-500/10 border-yellow-300/20 text-yellow-200",
    },

    unsold: {
      icon: XCircle,
      text: "UNSOLD",
      classes:
        "from-red-500/20 to-rose-500/10 border-red-400/20 text-red-200",
    },

    waiting: {
      icon: Clock3,
      text: "WAITING",
      classes:
        "from-cyan-500/20 to-blue-500/10 border-cyan-300/20 text-cyan-200",
    },
  };

  const current =
    configs[status] ||
    configs.waiting;

  const Icon =
    current.icon;

  return (
    <div
      className={`flex items-center gap-3 bg-gradient-to-r ${current.classes} border backdrop-blur-2xl px-6 py-4 rounded-3xl shadow-xl`}
    >

      {current.pulse && (
        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
      )}

      <Icon
        size={20}
        className={current.text.includes("LIVE")
          ? "text-green-300"
          : ""}
      />

      <span className="font-black text-sm tracking-[2px]">
        {current.text}
      </span>

    </div>
  );
};

export default AuctionStatus;