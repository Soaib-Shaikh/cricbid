import React, {
  useState,
} from "react";

import {
  Menu,
} from "lucide-react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({
  children,
}) {
  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 lg:ml-0">

        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center justify-between bg-white px-4 py-4 border-b sticky top-0 z-30">
          <button
            onClick={() =>
              setIsOpen(true)
            }
          >
            <Menu />
          </button>

          <h2 className="font-bold text-lg">
            CricBid
          </h2>
        </div>

        <div className="hidden lg:block">
          <Navbar />
        </div>

        <div className="p-4 md:p-6">
          {children}
        </div>

        <Footer />
      </div>
    </div>
  );
}