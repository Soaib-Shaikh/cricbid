import React, {
    useState,
} from "react";

import {
    Menu,
} from "lucide-react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import logo from "../assets/images/CricBid-Logo.png";

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

                    <img
                        src={logo}
                        alt="CricBid"
                        className="h-20 w-20 object-contain"
                    />
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