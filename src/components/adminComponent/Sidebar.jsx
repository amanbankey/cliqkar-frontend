import React, { useState } from "react";
import { FiGrid, FiUsers, FiCreditCard, FiChevronDown, FiGlobe, FiHelpCircle, FiSettings } from "react-icons/fi";
import { MdSupportAgent, MdOutlineConfirmationNumber, MdOutlineLocalAirport } from "react-icons/md";
import { TbPlaneDeparture } from "react-icons/tb";
import { BsWallet2 } from "react-icons/bs";

const visaSubItems = ["Visas List", "Applied Visas", "Applied OTB", "Over Stay"];
const ticketSubItems = ["Applied Tickets", "Series Tickets", "Cancel Tickets", "Offline Tickets"];

const Sidebar = ({ activeItem, onNavigate, sidebarOpen, setSidebarOpen }) => {
  const [visaOpen, setVisaOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);

  const isActive = (label) => activeItem === label;

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-30 h-screen w-64 bg-[#0B1120] flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex-shrink-0 overflow-y-auto`}
      >
        <div className="flex items-center gap-2 px-5 py-5">
          <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
            <TbPlaneDeparture className="text-white text-lg" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-tight">Cliqkar</p>
            <p className="text-blue-400 text-[10px] font-semibold tracking-widest">OPERATIONS</p>
          </div>
        </div>

        <nav className="flex-1 px-3 pb-6">
          <button
            onClick={() => onNavigate("Dashboard")}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium mb-4 transition-colors
            ${isActive("Dashboard") ? "bg-[#1E293B] text-white" : "text-gray-400 hover:bg-[#151F32]"}`}
          >
            <FiGrid className="text-base text-blue-400 flex-shrink-0" />
            Dashboard
          </button>

          <p className="px-3 text-[10px] font-semibold tracking-widest text-gray-500 mb-2">OPERATIONS</p>

          <button
            onClick={() => onNavigate("Users")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 transition-colors
            ${isActive("Users") ? "bg-[#1E293B] text-white" : "text-gray-400 hover:bg-[#151F32]"}`}
          >
            <FiUsers className="text-base flex-shrink-0" />
            Users
          </button>

          <button
            onClick={() => onNavigate("Agents")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 transition-colors
            ${isActive("Agents") ? "bg-[#1E293B] text-white" : "text-gray-400 hover:bg-[#151F32]"}`}
          >
            <MdSupportAgent className="text-base flex-shrink-0" />
            Agents
          </button>

          <button
            onClick={() => setVisaOpen(!visaOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 text-gray-400 hover:bg-[#151F32] transition-colors"
          >
            <FiCreditCard className="text-base flex-shrink-0" />
            <span className="flex-1 text-left">Visa Management</span>
            <FiChevronDown className={`text-sm transition-transform ${visaOpen ? "rotate-180" : ""}`} />
          </button>
          {visaOpen && (
            <div className="ml-[1.15rem] pl-4 border-l border-gray-700 mb-1">
              {visaSubItems.map((item) => (
                <button
                  key={item}
                  onClick={() => onNavigate(item)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs mb-0.5 transition-colors
                  ${isActive(item) ? "bg-[#1E293B] text-white" : "text-gray-500 hover:bg-[#151F32] hover:text-gray-300"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setTicketOpen(!ticketOpen)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 text-gray-400 hover:bg-[#151F32] transition-colors"
          >
            <MdOutlineConfirmationNumber className="text-base flex-shrink-0" />
            <span className="flex-1 text-left">Ticket Management</span>
            <FiChevronDown className={`text-sm transition-transform ${ticketOpen ? "rotate-180" : ""}`} />
          </button>
          {ticketOpen && (
            <div className="ml-[1.15rem] pl-4 border-l border-gray-700 mb-2">
              {ticketSubItems.map((item) => (
                <button
                  key={item}
                  onClick={() => onNavigate(item)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs mb-0.5 transition-colors
                  ${isActive(item) ? "bg-[#1E293B] text-white" : "text-gray-500 hover:bg-[#151F32] hover:text-gray-300"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          <p className="px-3 text-[10px] font-semibold tracking-widest text-gray-500 mt-3 mb-2">MASTER DATA</p>

          {[
            { label: "Airports", icon: MdOutlineLocalAirport },
            { label: "Countries", icon: FiGlobe },
            { label: "Airlines", icon: TbPlaneDeparture },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 transition-colors
              ${isActive(label) ? "bg-[#1E293B] text-white" : "text-gray-400 hover:bg-[#151F32]"}`}
            >
              <Icon className="text-base flex-shrink-0" />
              {label}
            </button>
          ))}

          <p className="px-3 text-[10px] font-semibold tracking-widest text-gray-500 mt-3 mb-2">FINANCE</p>

          {[
            { label: "Wallet History", icon: BsWallet2 },
            { label: "OTB Pricing", icon: FiCreditCard },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 transition-colors
              ${isActive(label) ? "bg-[#1E293B] text-white" : "text-gray-400 hover:bg-[#151F32]"}`}
            >
              <Icon className="text-base flex-shrink-0" />
              {label}
            </button>
          ))}

          <p className="px-3 text-[10px] font-semibold tracking-widest text-gray-500 mt-3 mb-2">SYSTEM</p>

          {[
            { label: "Support", icon: FiHelpCircle },
            { label: "Settings", icon: FiSettings },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm mb-1 transition-colors
              ${isActive(label) ? "bg-[#1E293B] text-white" : "text-gray-400 hover:bg-[#151F32]"}`}
            >
              <Icon className="text-base flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;