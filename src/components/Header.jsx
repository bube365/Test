import React, { useState } from "react";
import { Bell } from "lucide-react";
import { BsChatLeftText } from "react-icons/bs";
import { FaTimes, FaBars } from "react-icons/fa";
import logo from "../assets/icons/mainstack-logo.svg";
import {
  analyticsIcon,
  HomeIcon,
  revenueIcon,
  crmIcon,
  widget,
} from "../assets/icons";
import { useGetUserQuery } from "../store/api/apiSlice";
import { Skeleton } from "antd";

const Header = () => {
  const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();

  const [active, setActive] = useState("Revenue");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "#", icon: HomeIcon },
    { name: "Analytics", link: "#", icon: analyticsIcon },
    { name: "Revenue", link: "#", icon: revenueIcon },
    { name: "CRM", link: "#", icon: crmIcon },
    { name: "Apps", link: "#", icon: widget },
  ];

  return (
    <header className="fixed top-0 left-4 right-4 bg-white border-b border-gray-100 shadow-lg rounded-full z-50 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <img src={logo} alt="mainstack" className="" />

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((nav) => (
            <button
              key={nav.name}
              onClick={() => setActive(nav.name)}
              className={`flex items-center gap-1 text-[12px] rounded-full transition-all duration-200 ${
                active === nav.name
                  ? "bg-black text-white px-4 py-2 font-medium"
                  : "text-gray-500 font-medium hover:text-gray-800"
              }`}
            >
              <img src={nav.icon} alt={nav.name} />
              {nav.name}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <Bell className="w-5 h-5 text-[#56616B]" />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <BsChatLeftText className="text-[#56616B] font-bold text-lg" />
          </button>

          <div className="hidden md:flex bg-gradient-to-t from-[#DBDEE5] to-[#F6F7F9] items-center gap-1 p-2 rounded-3xl">
            {isLoadingUser ? (
              <Skeleton />
            ) : (
              <div className="w-9 h-9 bg-[#131316] rounded-full flex items-center justify-center text-white text-sm font-medium">
                {userData?.first_name[0]}
                {userData?.last_name[0]}
              </div>
            )}

            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <FaBars />
            </button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white rounded-2xl shadow-lg mt-2 py-3 flex flex-col items-center gap-4">
          {navLinks.map((nav) => (
            <button
              key={nav.name}
              onClick={() => {
                setActive(nav.name);
                setMenuOpen(false);
              }}
              className={`flex items-center w-[80%] gap-1 text-[13px] rounded-full transition-all duration-200 ${
                active === nav.name
                  ? "bg-black text-white px-3 py-2 font-medium"
                  : "text-gray-500 font-medium hover:text-gray-800"
              }`}
            >
              <img src={nav.icon} alt={nav.name} className="w-4 h-4" />
              {nav.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
