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
  const statusMap = {
    live: {
      bg: "bg-green-100",
      border: "border-green-200",
      text: "text-green-700",
      icon: (
        <Radio
          size={16}
          className="text-green-600"
        />
      ),
      label: "LIVE",
    },

    sold: {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      text: "text-yellow-700",
      icon: (
        <Trophy
          size={16}
          className="text-yellow-600"
        />
      ),
      label: "SOLD",
    },

    unsold: {
      bg: "bg-red-100",
      border: "border-red-200",
      text: "text-red-700",
      icon: (
        <XCircle
          size={16}
          className="text-red-600"
        />
      ),
      label: "UNSOLD",
    },

    waiting: {
      bg: "bg-cyan-100",
      border: "border-cyan-200",
      text: "text-cyan-700",
      icon: (
        <Clock3
          size={16}
          className="text-cyan-600"
        />
      ),
      label: "WAITING",
    },
  };

  const current =
    statusMap[status] ||
    statusMap.waiting;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-2xl border shadow-sm ${current.bg} ${current.border}`}
    >
      {current.icon}

      <span
        className={`font-black text-xs ${current.text}`}
      >
        {current.label}
      </span>
    </div>
  );
};

export default AuctionStatus;