import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiLoader,
} from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

import { signinAdmin } from "../../api/authApi";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await signinAdmin({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (!response?.success) {
        throw new Error(
          response?.message || "Admin login failed"
        );
      }

      const token = response?.token;

if (!token) {
  throw new Error(
    "Login successful but authentication token was not received."
  );
}

localStorage.setItem("token", token);

if (response?.admin) {
  localStorage.setItem(
    "admin",
    JSON.stringify(response.admin)
  );
}

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">

      {/* Background decoration */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

      </div>

      <div className="relative w-full max-w-md">

        {/* Brand */}

        <div className="text-center mb-7">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 shadow-lg shadow-blue-900/30 mb-4">
            <TbPlaneDeparture
              size={28}
              className="text-white"
            />
          </div>

          <h1 className="text-2xl font-bold text-white">
            Vivan Travels
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Administration Portal
          </p>

        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Card header */}

          <div className="px-7 pt-7 pb-5">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FiShield size={18} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Admin Sign In
                </h2>

                <p className="text-xs text-slate-400 mt-0.5">
                  Access your administration dashboard
                </p>
              </div>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <p className="text-xs font-medium text-red-600">
                  {error}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Email Address
                </label>

                <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-3.5 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition">

                  <FiMail
                    size={17}
                    className="text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@example.com"
                    autoComplete="email"
                    className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-300"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <div className="flex items-center justify-between mb-1.5">

                  <label className="text-xs font-semibold text-slate-600">
                    Password
                  </label>

                </div>

                <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-3.5 py-3 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition">

                  <FiLock
                    size={17}
                    className="text-slate-400"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-300"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <FiEyeOff size={17} />
                    ) : (
                      <FiEye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* Login */}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-xl shadow-sm shadow-blue-200 transition disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <FiLoader
                      size={16}
                      className="animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight size={16} />
                  </>
                )}

              </button>

            </form>

          </div>

          {/* Footer */}

          <div className="px-7 py-5 bg-slate-50 border-t border-slate-100 text-center">

            <p className="text-xs text-slate-400">
              Need an administrator account?
            </p>

            <Link
              to="/admin/signup"
              className="inline-block mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Admin Account
            </Link>

          </div>

        </div>

        <p className="text-center text-[11px] text-slate-500 mt-5">
          Secure administration access • Vivan Travels
        </p>

      </div>

    </div>
  );
};

export default AdminLogin;