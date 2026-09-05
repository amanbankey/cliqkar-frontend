import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png"
import {
  FiUser,
  FiBookOpen,
  FiCreditCard,
  FiFileText,
  FiCheckSquare,
  FiCheckCircle,
  FiSettings,
} from "react-icons/fi";

const user = {
  name: "Vivan Travels",
  email: "mail@vivantravels.com",
  creditBalance: "4,85,250",
};

const navItems = [
  { name: "My Profile", icon: FiUser, path: "/user-dashboard/profile" },
  { name: "My Bookings", icon: FiBookOpen, path: "/user-dashboard" },
  { name: "Wallet History", icon: FiCreditCard, path: "/user-dashboard/wallet-history" },
  { name: "Applied Visa History", icon: FiFileText, path: "/user-dashboard/visa-history" },
  { name: "Applied OTB History", icon: FiCheckSquare, path: "/user-dashboard/otb-history" },
];

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
      <div className="px-5 pt-6 pb-5">
        <img
                        src={logo}
                        className="object-contain w-36 36"
                      />
    
      </div>

      <div className="mx-5 mb-5 border border-gray-200 rounded-xl p-4">
        <p className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
          {user.name}
          <FiCheckCircle className="text-blue-500" size={13} />
        </p>

        <p className="text-xs text-gray-400 mt-0.5">
          {user.email}
        </p>

        <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
          <span className="text-[10px] font-semibold text-gray-400 tracking-wide">
            CREDIT BAL
          </span>

          <span className="text-sm font-bold text-gray-900">
            ₹{user.creditBalance}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/user-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50"
              }`
            }
          >
            <Icon size={16} />
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="m-3 bg-gray-50 rounded-xl px-4 py-3">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          GDS Live Sync
        </p>

        <p className="text-[11px] text-gray-400 mt-0.5">
          Amadeus &amp; Sabre 99.9%
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;