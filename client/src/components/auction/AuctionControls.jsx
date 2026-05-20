import React from "react";
import {
  Play,
  XCircle,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

const AuctionControls = ({
  onStart,
  onSold,
  onUnsold,
  onReset,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-5">

        <h2 className="text-2xl font-black text-white">
          Auction Controls
        </h2>

      </div>

      <div className="p-6">

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={onStart}
            disabled={disabled}
            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Play size={18} />
            Start
          </button>

          <button
            onClick={onSold}
            disabled={disabled}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle size={18} />
            Sold
          </button>

          <button
            onClick={onUnsold}
            disabled={disabled}
            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <XCircle size={18} />
            Unsold
          </button>

          <button
            onClick={onReset}
            className="bg-gray-700 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <RotateCcw size={18} />
            Reset
          </button>

        </div>

      </div>

    </div>
  );
};

export default AuctionControls;