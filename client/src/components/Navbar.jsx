import React from "react";
import { Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div className="h-[80px] bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* LEFT */}
      <div>

        <h1 className="text-2xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage your cricket auction professionally
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* NOTIFICATION */}
        <button className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all">

          <Bell size={18} />

        </button>

      </div>

    </div>
  );
};

export default Navbar;