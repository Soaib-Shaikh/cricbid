import React from "react";
import {
  Play,
  XCircle,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

const buttonBase =
  "py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1";

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
            className={`${buttonBase} bg-green-100 text-green-700 hover:bg-green-600 hover:text-white`}
          >
            <Play size={18} />
            Start
          </button>

          <button
            onClick={onSold}
            disabled={disabled}
            className={`${buttonBase} bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white`}
          >
            <CheckCircle size={18} />
            Sold
          </button>

          <button
            onClick={onUnsold}
            disabled={disabled}
            className={`${buttonBase} bg-red-100 text-red-700 hover:bg-red-600 hover:text-white`}
          >
            <XCircle size={18} />
            Unsold
          </button>

          <button
            onClick={onReset}
            className={`${buttonBase} bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-white`}
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