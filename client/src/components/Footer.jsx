import React from "react";

const Footer = () => {
  return (
    <div className="bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">

      <div>
        <h2 className="text-sm font-semibold text-gray-800">
          CricBid 🚀
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Premium Cricket Auction Platform
        </p>
      </div>

      <p className="text-xs text-gray-400">
        © 2026 CricBid. All Rights Reserved.
      </p>

    </div>
  );
};

export default Footer;