import React from "react";
import {
  LayoutDashboard,
  Trophy,
  Users,
  Gavel,
  ShieldCheck,
  LogOut,
  History,
  X,
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

const Sidebar = ({
  isOpen,
  setIsOpen,
}) => {
  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();

  const { user } =
    useSelector(
      (state) =>
        state.auth
    );

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
        <LayoutDashboard size={18} />
      ),
      path: "/dashboard",
    },
    {
      name: "Tournament",
      icon: (
        <Trophy size={18} />
      ),
      path: "/tournaments",
    },
    {
      name: "Teams",
      icon: (
        <ShieldCheck size={18} />
      ),
      path: "/teams",
    },
    {
      name: "Players",
      icon: (
        <Users size={18} />
      ),
      path: "/players",
    },
    {
      name: "Auction",
      icon: (
        <Gavel size={18} />
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
        <History size={18} />
      ),
      path: "/auction-history",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() =>
            setIsOpen(false)
          }
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <div
        className={`
          fixed lg:static top-0 left-0 z-50
          w-[260px] h-screen bg-white border-r border-gray-200 flex flex-col
          transform transition-transform duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="h-[80px] flex items-center justify-between px-5 border-b border-gray-100">
          <div className="flex items-center">
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
              <p className="text-[11px] text-green-500 tracking-wide">
                CRICKET AUCTION
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setIsOpen(false)
            }
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        {/* User */}
        <div className="px-4 py-5 border-b border-gray-100">
          <div className="bg-green-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
              {
                displayUser?.name
                  ?.charAt(0)
                  ?.toUpperCase() || "U"
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

        {/* Links */}
        <div className="flex-1 px-4 py-5 space-y-2">
          {links.map(
            (link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() =>
                  setIsOpen(false)
                }
                className={({
                  isActive,
                }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            )
          )}
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={
              handleLogout
            }
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;