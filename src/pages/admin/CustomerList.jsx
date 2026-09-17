import React, { useEffect, useState } from "react";
import {
  FiUsers,
  FiUser,
  FiMail,
  FiPhone,
  FiPlus,
  FiMoreVertical,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

import api from "../../api/axios";

const CustomerList = () => {
  const [searchForm, setSearchForm] = useState({
    name: "",
    email: "",
    number: "",
  });

  const [customers, setCustomers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const [openMenu, setOpenMenu] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");

  // =========================
  // GET ALL USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users");

      const data = response.data;

      if (data?.success) {
        setCustomers(data?.users || []);
        setTotalUsers(data?.total || 0);
      } else {
        setCustomers([]);
        setTotalUsers(0);

        setError(data?.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users failed:", error);

      setCustomers([]);
      setTotalUsers(0);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GET USER STATS
  // =========================
  const fetchUserStats = async () => {
    try {
      const response = await api.get("/users/stats");

      const data = response.data;

      if (data?.success) {
        setTotalUsers(data?.data?.stats?.totalRegistered || 0);
      }
    } catch (error) {
      console.error("Fetch user stats failed:", error);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchUsers();
    //fetchUserStats();
  }, []);

  // =========================
  // SEARCH INPUT
  // =========================
  const handleChange = (e) => {
    setSearchForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // SEARCH USERS
  // =========================
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setSearching(true);
      setError("");
      setOpenMenu(null);

      const response = await api.post("/users/search", searchForm);

      const data = response.data;

      if (data?.success) {
        setCustomers(data?.users || []);
      } else {
        setCustomers([]);
        setError(data?.message || "Search failed");
      }
    } catch (error) {
      console.error("Search failed:", error);

      setCustomers([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Search failed"
      );
    } finally {
      setSearching(false);
    }
  };

  // =========================
  // RESET SEARCH
  // =========================
  const handleReset = async () => {
    setSearchForm({
      name: "",
      email: "",
      number: "",
    });

    await fetchUsers();
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await api.delete(`/users/${id}`);

      const data = response.data;

      if (data?.success) {
        setCustomers((prev) =>
          prev.filter((customer) => customer._id !== id)
        );

        setTotalUsers((prev) => Math.max(prev - 1, 0));

        setOpenMenu(null);
      } else {
        setError(data?.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Delete user failed:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete user"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // INITIALS
  // =========================
  const getInitials = (name = "") => {
    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 0) {
      return "U";
    }

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Operations{" "}
            <span className="mx-1">›</span>

            <span className="text-blue-600 font-medium">
              Customer List
            </span>
          </p>

          <h1 className="text-2xl font-bold text-gray-900">
            Customer List
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage client accounts and direct actions.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit"
        >
          <FiPlus size={16} />

          Add New Customer
        </button>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* ================= STAT CARD ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <FiUsers className="text-indigo-500 text-lg" />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">
              Total Registered
            </p>

            <span className="text-xl font-bold text-gray-900">
              {totalUsers}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <FiUser className="text-emerald-500 text-lg" />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">
              Users
            </p>

            <span className="text-xl font-bold text-gray-900">
              {customers.length}
            </span>
          </div>
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl border border-gray-200 p-4 mb-4"
      >
        <div className="flex flex-col lg:flex-row gap-3">

          {/* NAME */}
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">

            <FiUser
              className="text-gray-400 flex-shrink-0"
              size={16}
            />

            <input
              type="text"
              name="name"
              value={searchForm.name}
              onChange={handleChange}
              placeholder="Search by Name"
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">

            <FiMail
              className="text-gray-400 flex-shrink-0"
              size={16}
            />

            <input
              type="text"
              name="email"
              value={searchForm.email}
              onChange={handleChange}
              placeholder="Search by Email"
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>

          {/* NUMBER */}
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">

            <FiPhone
              className="text-gray-400 flex-shrink-0"
              size={16}
            />

            <input
              type="text"
              name="number"
              value={searchForm.number}
              onChange={handleChange}
              placeholder="Search by Number"
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2">

            <button
              type="submit"
              disabled={searching}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold px-6 py-2.5 rounded-lg"
            >
              {searching ? "Searching..." : "Search"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50"
            >
              Reset
            </button>

          </div>
        </div>
      </form>

      {/* ================= USER TABLE ================= */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  SL
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  FULL NAME
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  EMAIL
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  NUMBER
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  COUNTRY
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  ROLE
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                customers.map((customer, i) => (

                  <tr
                    key={customer._id}
                    className="border-b border-gray-100 last:border-0"
                  >

                    {/* SL */}
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {i + 1}
                    </td>

                    {/* FULL NAME */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        <span className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {getInitials(customer.fullName)}
                        </span>

                        <p className="text-sm font-semibold text-gray-900">
                          {customer.fullName || "N/A"}
                        </p>

                      </div>

                    </td>

                    {/* EMAIL */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <FiMail
                          size={14}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span>
                          {customer.email || "N/A"}
                        </span>

                      </div>

                    </td>

                    {/* NUMBER */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <FiPhone
                          size={14}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span>
                          {customer.phoneNumber || "N/A"}
                        </span>

                      </div>

                    </td>

                    {/* COUNTRY */}
                    <td className="px-4 py-4">

                      <span className="text-sm text-gray-700">
                        {customer.country || "N/A"}
                      </span>

                    </td>

                    {/* ROLE */}
                    <td className="px-4 py-4">

                      <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                        {customer.role || "N/A"}
                      </span>

                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-4 relative">

                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === customer._id
                              ? null
                              : customer._id
                          )
                        }
                        className="text-gray-400 hover:text-gray-700"
                      >
                        <FiMoreVertical size={18} />
                      </button>

                      {openMenu === customer._id && (

                        <div className="absolute right-4 top-10 z-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1">

                          {/* VIEW */}
                          <button
                            type="button"
                            onClick={() => {
                              console.log(
                                "View user:",
                                customer._id
                              );

                              setOpenMenu(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                          >
                            <FiEye size={13} />
                            View
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            disabled={
                              deletingId === customer._id
                            }
                            onClick={() =>
                              handleDelete(customer._id)
                            }
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <FiTrash2 size={13} />

                            {deletingId === customer._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Showing {customers.length} of {totalUsers} users
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled
              className="border border-gray-200 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-lg cursor-not-allowed"
            >
              Previous
            </button>

            <button
              type="button"
              className="w-8 h-8 text-xs font-semibold rounded-lg bg-[#0B1120] text-white"
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="border border-gray-200 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-lg cursor-not-allowed"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CustomerList;