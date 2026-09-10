import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logout successfully ");
  };

  const onDashboard = () => {
    navigate("/dashboard");
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Flight ", path: "/flight" },
    { name: "Visa", path: "/visa" },
    { name: "Okay to board", path: "/okay-to-board" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/" },
  ];

  return (
    <div className="z-20 sticky top-0">
      <nav className="w-full bg-white/80 backdrop-blur-xl shadow-md border-b border-white/40">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:px-4 md:px-5 lg:px-10 h-[65px] sm:h-[70px] max-w-screen-2xl mx-auto">
          <NavLink to="/" className="flex-shrink-0 text-black duration-200">
            <img src={logo} className="object-contain w-36" />
          </NavLink>

          <div className="hidden lg:flex justify-center">
            <div className="flex items-center bg-[#0A2540]/5 rounded-full p-1 gap-0.5">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2.5 rounded-full text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "bg-[#0A2540] text-white shadow-md"
                        : "text-gray-600 hover:text-[#0A2540]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {/*<button
              className="hidden sm:block px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer text-sm font-medium transition-colors"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
            <button
              className="hidden sm:block px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer text-sm font-medium transition-colors"
              onClick={() => navigate("/user-dashboard")}
            >
              User Dashboard
            </button>*/}
            <button
              onClick={() => navigate("/signin")}
              className="hidden sm:block px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer text-sm font-medium transition-colors"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="hidden sm:block px-4 py-2 bg-[#0A2540] text-white rounded-full cursor-pointer text-sm font-medium shadow-md hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>

            {!mobileMenuOpen && (
              <button
                className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
                <span className="w-5 h-0.5 bg-gray-700 rounded transition-all duration-300" />
              </button>
            )}

            {mobileMenuOpen && (
              <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
                <RxCross1 className="text-2xl block lg:hidden" />
              </button>
            )}
          </div>
        </div>

        <div
          className={[
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white",
            mobileMenuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="flex flex-col px-6 py-4 gap-2 text-[15px] font-medium border-t border-gray-100">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-[#0A2540] text-white w-fit"
                      : "text-gray-700 hover:text-[#0A2540] w-fit"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <div className="flex flex-col items-center gap-3 mt-2 mb-1">
              {/*<button
                className="hover:text-white text-[#0A2540] bg-white hover:bg-[#0A2540] border border-[#0A2540] px-3 py-2 rounded-full w-full"
                onClick={onDashboard}
              >
                Dashboard
              </button>
              <button
                className="hover:text-white text-[#0A2540] bg-white hover:bg-[#0A2540] border border-[#0A2540] px-3 py-2 rounded-full w-full"
                onClick={() => {
                  navigate("/user-dashboard");
                  setMobileMenuOpen(false);
                }}
              >
                User Dashboard
              </button>*/}

              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer w-full"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen((prev) => !prev);
                  navigate("/signup");
                }}
                className="w-full text-center block px-4 py-2 bg-[#0A2540] hover:opacity-90 text-white rounded-full cursor-pointer"
              >
                Get Started
              </button>
              {isLoggedIn && (
                <button
                  className="text-white bg-[#0A2540] px-3 py-2 rounded-full w-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;