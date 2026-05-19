import React from "react";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Gavel,
  ShieldCheck,
  LogOut,
  History,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  logout,
} from "../features/auth/authSlice";

import logo from "../assets/images/CricBid-Logo.png";

const Sidebar = () => {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const { user } =
    useSelector(
      (state) =>
        state.auth
    );

  // fallback from localStorage
  const savedUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const displayUser =
    user || savedUser;

  const handleLogout =
    () => {
      dispatch(
        logout()
      );

      navigate("/");
    };

  const links = [
    {
      name: "Dashboard",
      icon: (
        <LayoutDashboard
          size={18}
        />
      ),
      path: "/dashboard",
    },

    {
      name: "Tournament",
      icon: (
        <Trophy
          size={18}
        />
      ),
      path: "/tournaments",
    },

    {
      name: "Teams",
      icon: (
        <ShieldCheck
          size={18}
        />
      ),
      path: "/teams",
    },

    {
      name: "Players",
      icon: (
        <Users
          size={18}
        />
      ),
      path: "/players",
    },

    {
      name: "Auction",
      icon: (
        <Gavel
          size={18}
        />
      ),
      path: "/auction",
    },

    {
      name: "Unsold Players",
      icon: (
        <Users size={18} />
      ),
      path: "/unsold-players",
    },

    {
      name: "Auction History",
      icon: (
        <History
          size={18}
        />
      ),
      path: "/auction-history",
    },
  ];

  return (
    <div className="w-[260px] min-h-screen bg-white border-r border-gray-200 flex flex-col">

      {/* LOGO */}
      <div className="h-[80px] flex items-center px-5 border-b border-gray-100">

        <div className="w-11 h-11 rounded-xl overflow-hidden">
          <img
            src={logo}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="ml-3">
          <h1 className="text-xl font-bold text-gray-900">
            CricBid
          </h1>

          <p className="text-[11px] text-red-500 tracking-wide">
            CRICKET AUCTION
          </p>
        </div>

      </div>

      {/* USER */}
      <div className="px-4 py-5 border-b border-gray-100">

        <div className="bg-red-50 rounded-2xl p-4 flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
            {
              displayUser?.name
                ?.charAt(0)
                ?.toUpperCase() ||
              "U"
            }
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              {
                displayUser?.name ||
                "User"
              }
            </h2>

            <p className="text-xs text-gray-500">
              Tournament Organizer
            </p>
          </div>

        </div>

      </div>

      {/* LINKS */}
      <div className="flex-1 px-4 py-5 space-y-2">

        {links.map(
          (
            link,
            index
          ) => (
            <NavLink
              key={index}
              to={link.path}
              className={({
                isActive,
              }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-red-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                }`
              }
            >
              {
                link.icon
              }

              {
                link.name
              }
            </NavLink>
          )
        )}

      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-100">

        <button
          onClick={
            handleLogout
          }
          className="w-full bg-red-600 hover:bg-red-700 transition-all text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
        >
          <LogOut
            size={18}
          />

          Logout
        </button>

      </div>

    </div>
  );
};

export default Sidebar;