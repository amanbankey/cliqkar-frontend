import React, { useEffect, useState } from "react";
import {
  FiPlus,
  FiHome,
  FiPhone,
  FiMail,
  FiMessageSquare,
  FiEye,
  FiEdit2,
  FiCheckCircle,
  FiTrash2,
} from "react-icons/fi";

import AgentProfileDrawer from "./AgentProfileDrawer";
import VisaChargesManagementPopup from "./AgentView";

import api from "../../api/axios";

const AgentDirectory = () => {
  const [filters, setFilters] = useState({
    companyName: "",
    mobileNumber: "",
    ownershipType: "",
    status: "",
  });

  const [agents, setAgents] = useState([]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [viewAgent, setViewAgent] = useState(null);
  const [visaAgent, setVisaAgent] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET ALL AGENTS
  // =========================
  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/agents");
      const data = response.data;

      console.log("AGENTS API RESPONSE:", data);

      if (data?.success) {
        setAgents(data?.data || []);
      } else {
        setAgents([]);
        setError(data?.message || "Failed to fetch agents");
      }
    } catch (error) {
      console.error("Fetch agents failed:", error);

      setAgents([]);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch agents"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================
  useEffect(() => {
    fetchAgents();
  }, []);

  // =========================
  // FILTER INPUT
  // =========================
  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // APPLY FILTERS
  // =========================
  const handleApplyFilters = (e) => {
    e.preventDefault();

    console.log("Filters selected:", filters);
  };

  // =========================
  // RESET
  // =========================
  const handleReset = () => {
    setFilters({
      companyName: "",
      mobileNumber: "",
      ownershipType: "",
      status: "",
    });

    fetchAgents();
  };

  // =========================
  // INITIALS
  // =========================
  const getInitials = (name = "") => {
    const words = name.trim().split(" ").filter(Boolean);

    if (words.length === 0) {
      return "A";
    }

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) + words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  // =========================
  // DELETE AGENT
  // =========================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this agent?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await api.delete(`/agents/${id}`);
      const data = response.data;

      if (data?.success) {
        setAgents((prev) =>
          prev.filter((agent) => agent._id !== id)
        );

        if (selectedAgent?._id === id) {
          setSelectedAgent(null);
        }

        if (viewAgent?._id === id) {
          setViewAgent(null);
        }

        if (visaAgent?._id === id) {
          setVisaAgent(null);
        }
      } else {
        setError(data?.message || "Failed to delete agent");
      }
    } catch (error) {
      console.error("Delete agent failed:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete agent"
      );
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 overflow-y-auto hide-scrollbar w-full min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">

        <div>
          <p className="text-xs text-gray-500 mb-1">
            Operations{" "}
            <span className="mx-1">›</span>{" "}
            B2B Partner Network{" "}
            <span className="mx-1">›</span>

            <span className="text-blue-600 font-medium">
              Agents Directory
            </span>
          </p>

          <div className="flex items-center gap-2 flex-wrap">

            <h1 className="text-2xl font-bold text-gray-900">
              Agent Directory
            </h1>

            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              {agents.length} Registered Partners
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-1">
            Manage commercial terms, credit lines, agent verification,
            and daily communication.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit"
        >
          <FiPlus size={16} />
          Onboard New Agent
        </button>

      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">

        <div className="bg-white rounded-2xl border border-gray-200 p-4">

          <p className="text-sm text-gray-500 mb-2">
            Total Agent Partners
          </p>

          <div className="flex items-center gap-3">

            <span className="text-2xl font-bold text-gray-900">
              {agents.length}
            </span>

            <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Registered
            </span>

          </div>

        </div>

      </div>

      {/* ================= FILTER ================= */}
      <form
        onSubmit={handleApplyFilters}
        className="bg-white rounded-2xl border border-gray-200 p-4 mb-4"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-3">

          {/* COMPANY NAME */}
          <div>

            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Company Name
            </label>

            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">

              <FiHome
                className="text-gray-400 flex-shrink-0"
                size={15}
              />

              <input
                type="text"
                name="companyName"
                value={filters.companyName}
                onChange={handleChange}
                placeholder="Search by name"
                className="w-full text-sm text-gray-700 focus:outline-none"
              />

            </div>

          </div>

          {/* MOBILE */}
          <div>

            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Mobile Number
            </label>

            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">

              <FiPhone
                className="text-gray-400 flex-shrink-0"
                size={15}
              />

              <input
                type="text"
                name="mobileNumber"
                value={filters.mobileNumber}
                onChange={handleChange}
                placeholder="Search by number"
                className="w-full text-sm text-gray-700 focus:outline-none"
              />

            </div>

          </div>

          {/* OWNERSHIP */}
          <div>

            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Ownership Type
            </label>

            <select
              name="ownershipType"
              value={filters.ownershipType}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            >

              <option value="">All Types</option>
              <option value="OPC">OPC</option>
              <option value="PVT LTD">PVT LTD</option>
              <option value="PARTNERSHIP">PARTNERSHIP</option>
              <option value="PRIVATE">PRIVATE</option>

            </select>

          </div>

          {/* STATUS */}
          <div>

            <label className="text-xs font-medium text-gray-600 mb-1 block">
              Status
            </label>

            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
            >

              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>

            </select>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg"
          >
            Apply Filters
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50"
          >
            Reset
          </button>

        </div>

      </form>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="border-b border-gray-200">

                <th
                  colSpan={3}
                  className="text-left text-xs font-semibold text-gray-500 px-4 py-2"
                >
                  AGENT INFO
                </th>

                <th className="text-left text-xs font-semibold text-blue-600 px-4 py-2 border-l border-gray-100">
                  COMMISSIONS &amp; RESTRICTIONS
                </th>

                <th
                  colSpan={2}
                  className="text-left text-xs font-semibold text-gray-500 px-4 py-2"
                >
                  MANAGEMENT
                </th>

              </tr>

              <tr className="bg-gray-50 border-b border-gray-200">

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  ENTERPRISE
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  CONTACT
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  COMPLIANCE
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3 border-l border-gray-100">
                  COMMERCIALS
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  STATUS
                </th>

                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {/* LOADING */}
              {loading ? (

                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    Loading agents...
                  </td>
                </tr>

              ) : agents.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-gray-500"
                  >
                    No agents found.
                  </td>
                </tr>

              ) : (

                agents.map((agent) => (

                  <tr
                    key={agent._id}
                    className="border-b border-gray-100 last:border-0 align-top"
                  >

                    {/* ENTERPRISE */}
                    <td className="px-4 py-4">

                      <div className="flex items-start gap-3">

                        <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {getInitials(
                            agent.companyName || agent.fullName
                          )}
                        </span>

                        <div>

                          <p className="text-sm font-semibold text-gray-900">
                            {agent.companyName ||
                              agent.fullName ||
                              "N/A"}
                          </p>

                          {agent.companyName && (
                            <p className="text-xs text-gray-500 mb-1">
                              {agent.fullName || "N/A"}
                            </p>
                          )}

                          {agent.havingGST && (
                            <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                              GST
                            </span>
                          )}

                        </div>

                      </div>

                    </td>

                    {/* CONTACT */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-1.5">

                        <FiMail
                          size={12}
                          className="text-gray-400"
                        />

                        {agent.email || "N/A"}

                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-gray-600">

                        <FiPhone
                          size={12}
                          className="text-gray-400"
                        />

                        {agent.mobileNumber || "N/A"}

                        <FiMessageSquare
                          size={13}
                          className="text-emerald-500 ml-1"
                        />

                      </div>

                    </td>

                    {/* COMPLIANCE */}
                    <td className="px-4 py-4">

                      {agent.identityProof?.proofType && (
                        <div className="bg-gray-50 border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-600 mb-2 w-fit">
                          {agent.identityProof.proofType}
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 text-xs font-medium w-fit px-2 py-1 rounded-full bg-emerald-50 text-emerald-600">

                        <FiCheckCircle size={11} />

                        Verified

                      </div>

                    </td>

                    {/* COMMERCIALS */}
                    <td className="px-4 py-4 border-l border-gray-100 bg-blue-50/20">

                      <div className="flex flex-col gap-1.5">

                        {agent.havingGST ? (

                          <>
                            {agent.gstName && (
                              <span className="w-fit text-xs font-medium px-2 py-1 rounded border bg-blue-50 text-blue-600 border-blue-100">
                                GST: {agent.gstName}
                              </span>
                            )}

                            {agent.companyName && (
                              <span className="w-fit text-xs font-medium px-2 py-1 rounded border bg-gray-50 text-gray-600 border-gray-200">
                                {agent.companyName}
                              </span>
                            )}
                          </>

                        ) : (

                          <span className="w-fit text-xs font-medium px-2 py-1 rounded border bg-gray-50 text-gray-600 border-gray-200">
                            No GST
                          </span>

                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setViewAgent(null);
                            setSelectedAgent(null);
                            setVisaAgent(agent);
                          }}
                          className="text-blue-500 hover:text-blue-700 mt-1 w-fit"
                        >
                          <FiEye size={14} />
                        </button>

                      </div>

                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-4">

                      <span className="relative w-11 h-6 rounded-full bg-emerald-100 flex items-center">

                        <span className="absolute left-5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">

                          <FiCheckCircle size={11} />

                        </span>

                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3 text-gray-500">

                        {/* VIEW */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAgent(null);
                            setVisaAgent(null);
                            setViewAgent(agent);
                          }}
                          className="hover:text-blue-600"
                          title="View Agent"
                        >
                          <FiEye size={16} />
                        </button>

                        {/* EDIT / PROFILE */}
                        <button
                          type="button"
                          onClick={() => {
                            setViewAgent(null);
                            setVisaAgent(null);
                            setSelectedAgent(agent);
                          }}
                          className="hover:text-blue-600"
                          title="Agent Profile"
                        >
                          <FiEdit2 size={16} />
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          onClick={() => handleDelete(agent._id)}
                          className="hover:text-red-600"
                          title="Delete Agent"
                        >
                          <FiTrash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">

          <p className="text-sm text-gray-500">
            Showing {agents.length} Agents
          </p>

          <div className="flex items-center gap-1.5">

            <button
              type="button"
              disabled
              className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg cursor-not-allowed"
            >
              ‹
            </button>

            <button
              type="button"
              className="w-8 h-8 text-xs font-semibold rounded-lg bg-blue-600 text-white"
            >
              1
            </button>

            <button
              type="button"
              disabled
              className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-400 rounded-lg cursor-not-allowed"
            >
              ›
            </button>

          </div>

        </div>

      </div>

      {/* ================= VISA VIEW ================= */}
      {visaAgent && (
        <VisaChargesManagementPopup
          agent={visaAgent}
          onClose={() => setVisaAgent(null)}
          onViewProfile={() => {
            const agent = visaAgent;

            setVisaAgent(null);
            setSelectedAgent(agent);
          }}
        />
      )}

      {/* ================= AGENT PROFILE ================= */}
      {selectedAgent && (
        <AgentProfileDrawer
          agent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}

      {/* ================= VIEW POPUP ================= */}
      {viewAgent && (
        <VisaChargesManagementPopup
          agent={viewAgent}
          onClose={() => setViewAgent(null)}
          onViewProfile={() => {
            const agent = viewAgent;

            setViewAgent(null);
            setSelectedAgent(agent);
          }}
        />
      )}

    </div>
  );
};

export default AgentDirectory;