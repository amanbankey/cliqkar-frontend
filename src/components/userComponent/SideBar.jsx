import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiUser,
  FiBookOpen,
  FiCreditCard,
  FiFileText,
  FiCheckSquare,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import cliqkar from "../../assets/image/cliqkarLogo.png";

const user = {
  name: "Vivan Travels",
  email: "mail@vivantravels.com",
  creditBalance: "4,85,250",
};

const navItems = [
  { name: "My Profile", icon: FiUser, path: "/user-dashboard/profile" },
  { name: "My Bookings", icon: FiBookOpen, path: "/user-dashboard" },
  {
    name: "Wallet History",
    icon: FiCreditCard,
    path: "/user-dashboard/wallet-history",
  },
  {
    name: "Applied Visa History",
    icon: FiFileText,
    path: "/user-dashboard/visa-history",
  },
  {
    name: "Applied OTB History",
    icon: FiCheckSquare,
    path: "/user-dashboard/otb-history",
  },
];

/* Page load par ek hi entrance sequence. Baaki sab hover / active feedback hai. */
const styles = `
@keyframes sb-enter {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes sb-sheen {
  0%   { transform: translateX(-140%) skewX(-20deg); }
  55%, 100% { transform: translateX(420%) skewX(-20deg); }
}
@keyframes sb-live {
  0%   { box-shadow: 0 0 0 0 rgba(52, 211, 153, .55); }
  100% { box-shadow: 0 0 0 8px rgba(52, 211, 153, 0); }
}
.sb-enter { animation: sb-enter .55s cubic-bezier(.22,1,.36,1) both; }
.sb-sheen { animation: sb-sheen 5s ease-in-out 1.2s infinite; }
.sb-live  { animation: sb-live 2s ease-out infinite; }
.sb-scroll::-webkit-scrollbar { display: none; }
.sb-scroll { scrollbar-width: none; }
@media (prefers-reduced-motion: reduce) {
  .sb-enter, .sb-sheen, .sb-live { animation: none !important; }
}
`;

const getInitial = (name) => (name?.trim()?.[0] || "U").toUpperCase();

const Sidebar = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <>
      <style>{styles}</style>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-20 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:fixed top-[100px] left-0 lg:left-11 z-30
          h-[calc(100vh-124px)] max-h-[700px] w-64
          bg-gradient-to-b from-[#1B2B63] via-[#0F1A3C] to-[#070B18]
          border border-white/10
          shadow-2xl shadow-blue-950/40
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          flex-shrink-0
          overflow-hidden
          rounded-3xl`}
      >
        {/* ---------- background layers ---------- */}
        {/* dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
          }}
        />
        {/* glows */}
        <div className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />
        {/* top edge highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* ---------- LOGO ---------- */}
        <div
          className="relative px-6 pt-5 pb-3 sb-enter"
          style={{ animationDelay: "0.05s" }}
        >
         {/* <img src={cliqkar} alt="Cliqkar" className="object-contain w-32" />*/}
        </div>

        {/* ---------- USER CARD ---------- */}
        <div
          className="relative mx-4 mb-4 rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.04] p-3 backdrop-blur-md shadow-lg shadow-black/20 sb-enter"
          style={{ animationDelay: "0.12s" }}
        >
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-blue-800 text-base font-bold text-white shadow-lg shadow-blue-900/50 ring-1 ring-white/30">
                {getInitial(user.name)}
              </div>
              <span className="sb-live absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#101B40] bg-emerald-400" />
            </div>

            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <span className="truncate">{user.name}</span>
                <FiCheckCircle
                  className="flex-shrink-0 text-sky-300"
                  size={13}
                />
              </p>

              <p className="truncate text-[11px] text-slate-300/80">
                {user.email}
              </p>
            </div>
          </div>

          {/* credit balance */}
          <div className="relative mt-3 overflow-hidden rounded-xl bg-gradient-to-br from-white via-blue-50 to-sky-100 p-2.5 shadow-inner transition-transform duration-300 hover:-translate-y-0.5">
            <span className="sb-sheen pointer-events-none absolute inset-y-0 left-0 w-10 bg-white/80 blur-md" />

            <div className="relative flex items-center gap-2.5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-900/30">
                <FiCreditCard size={16} />
              </span>

              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-none text-slate-500">
                  Credit Balance
                </p>
                <p className="mt-1 text-base font-bold leading-none text-slate-900 tabular-nums">
                  ₹{user.creditBalance}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- NAVIGATION ---------- */}
        <nav className="sb-scroll relative min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map(({ name, icon: Icon, path }, index) => (
            <NavLink
              onClick={() => setSidebarOpen(false)}
              key={name}
              to={path}
              end={path === "/user-dashboard"}
              style={{ animationDelay: `${0.2 + index * 0.06}s` }}
              className={({ isActive }) =>
                `sb-enter group relative flex items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-medium
                outline-none transition-all duration-300
                focus-visible:ring-2 focus-visible:ring-sky-300/70
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white shadow-lg shadow-blue-950/60 ring-1 ring-white/20"
                    : "text-slate-300/80 hover:bg-white/[0.08] hover:text-white hover:translate-x-1"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.6)]" />
                  )}

                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/[0.06] text-slate-300 group-hover:bg-sky-400/20 group-hover:text-sky-200"
                    }`}
                  >
                    <Icon size={16} />
                  </span>

                  <span className="flex-1 truncate">{name}</span>

                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-200 shadow-[0_0_8px_2px_rgba(186,230,253,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ---------- FOOTER ---------- */}
        <div
          className="relative mx-4 my-3 flex items-center gap-2.5 rounded-xl border border-white/10 bg-gradient-to-r from-emerald-400/15 to-sky-400/10 px-3 py-2 sb-enter"
          style={{ animationDelay: "0.55s" }}
        >
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-400/20 text-emerald-300">
            <FiShield size={14} />
          </span>
          <p className="text-[11px] leading-tight text-slate-300">
            Secure session
            <span className="block text-slate-400">Your data is encrypted</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;