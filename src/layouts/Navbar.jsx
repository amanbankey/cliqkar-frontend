import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { RxCross1 } from "react-icons/rx";
import { FiUser, FiChevronDown } from "react-icons/fi";
import cliqkar from "../assets/image/cliqkarLogo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");

  // Get logged-in user saved after login
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid user data");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProfileOpen(false);

    navigate("/");
    toast.success("Logout successfully ");
  };

  const openUserProfile = () => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
    navigate("/user-dashboard/profile");
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
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="z-20 sticky top-0">
      <nav className="w-full bg-white/80 backdrop-blur-xl shadow-md border-b border-white/40">

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:px-4 md:px-5 lg:px-10 h-[65px] sm:h-[70px] max-w-screen-2xl mx-auto">

          {/* LOGO */}
          <NavLink
            to="/"
            className="flex-shrink-0 text-black duration-200"
          >
            <img
              src={cliqkar}
              className="object-contain w-32"
            />
          </NavLink>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden xl:flex justify-center">
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

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">

            {/* EXISTING USER DASHBOARD BUTTON 
            <button
              className="hidden sm:block px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer text-sm font-medium transition-colors"
              onClick={() => navigate("/user-dashboard")}
            >
              User Dashboard
            </button>

            {/* ================= USER PROFILE ================= */}
            
            {/* EXISTING SIGN IN */}
            <button
              onClick={() => navigate("/signin")}
              className="hidden sm:block px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer text-sm font-medium transition-colors"
            >
              Sign in
            </button>

            {/* EXISTING ADMIN LOGIN */}
            <button
              onClick={() => navigate("/admin/login")}
              className="hidden sm:block px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer text-sm font-medium transition-colors"
            >
              Admin Login
            </button>
            {isLoggedIn && user && (
              <div
                className="hidden sm:block relative"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer text-sm font-medium transition-colors hover:bg-[#0A2540] hover:text-white"
                >
                  {/* USER ICON */}
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0A2540] text-white">
                    <FiUser size={15} />
                  </span>

                  {/* ACTUAL USER NAME */}
                  <span className="max-w-[120px] truncate">
                    {user.fullName || user.name || user.username || "User"}
                  </span>

                  <FiChevronDown size={15} />
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 top-full pt-2 w-64">

                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-3">

                      {/* NAME + EMAIL */}
                      <button
                        type="button"
                        onClick={openUserProfile}
                        className="w-full text-left px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">

                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A2540] text-white flex-shrink-0">
                            <FiUser size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#0A2540] truncate">
                              {user.fullName ||
                                user.name ||
                                user.username ||
                                "User"}
                            </p>

                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {user.email || ""}
                            </p>
                          </div>

                        </div>
                      </button>

                      {/* SIGN OUT */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2.5 mt-1 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>

                    </div>
                  </div>
                )}
              </div>
            )}


            {/* MOBILE MENU OPEN */}
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

            {/* MOBILE MENU CLOSE */}
            {mobileMenuOpen && (
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                <RxCross1 className="text-2xl block lg:hidden" />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={[
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white",
            mobileMenuOpen
              ? "max-h-[560px] opacity-100"
              : "max-h-0 opacity-0",
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

              {/* EXISTING USER DASHBOARD 
              <button
                className="hover:text-white text-[#0A2540] bg-white hover:bg-[#0A2540] border border-[#0A2540] px-3 py-2 rounded-full w-full"
                onClick={() => {
                  navigate("/user-dashboard");
                  setMobileMenuOpen(false);
                }}
              >
                User Dashboard
              </button>

              {/* MOBILE LOGGED-IN USER */}
              {isLoggedIn && user && (
                <>
                  <button
                    onClick={openUserProfile}
                    className="w-full text-left border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">

                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0A2540] text-white">
                        <FiUser size={16} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0A2540] truncate">
                          {user.fullName ||
                            user.name ||
                            user.username ||
                            "User"}
                        </p>

                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {user.email || ""}
                        </p>
                      </div>

                    </div>
                  </button>

                  <button
                    className="text-red-500 border border-red-200 px-3 py-2 rounded-full w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}

              {/* EXISTING SIGN IN */}
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer w-full"
              >
                Sign in
              </button>

              {/* EXISTING ADMIN LOGIN */}
              <button
                onClick={() => {
                  navigate("/admin/login");
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 hover:bg-[#0A2540] hover:text-white border border-[#0A2540] text-[#0A2540] rounded-full cursor-pointer w-full"
              >
                Admin Login
              </button>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;