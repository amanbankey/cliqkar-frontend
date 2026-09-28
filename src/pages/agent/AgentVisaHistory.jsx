import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiGlobe,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle,
  FiEdit,
  FiCopy,
  FiCheck,
} from "react-icons/fi";

import { getMyAgentVisaApplications } from "../../api/agentApi";
import {
  agentPageStyles,
  PageHeader,
  StatCard,
  SearchBar,
  LoadingSkeleton,
  ErrorState,
  EmptyState,
} from "./agentPageHelpers";

const statusConfig = {
  Approved: { label: "Approved", icon: FiCheckCircle, badge: "bg-emerald-50 text-emerald-700 ring-emerald-100", accent: "bg-emerald-500" },
  Processing: { label: "In Processing", icon: FiClock, badge: "bg-blue-50 text-blue-700 ring-blue-100", accent: "bg-blue-500" },
  Hold: { label: "On Hold", icon: FiAlertTriangle, badge: "bg-red-50 text-red-700 ring-red-100", accent: "bg-red-500" },
  Draft: { label: "Draft", icon: FiEdit, badge: "bg-gray-100 text-gray-600 ring-gray-200", accent: "bg-gray-300" },
};

const VisaRow = ({ item, index }) => {
  const [copied, setCopied] = useState(false);
  const cfg = statusConfig[item.status] || statusConfig.Processing;
  const StatusIcon = cfg.icon;

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(item.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className="agp-rise relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
      style={{ animationDelay: `${0.15 + index * 0.07}s` }}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${cfg.accent}`} />

      <div className="p-5 pl-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-base font-bold text-gray-900">{item.visaTitle}</p>

            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copyRef}
                className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-gray-500 transition-colors hover:bg-slate-100 hover:text-blue-900"
              >
                Ref #{item.referenceNumber}
                {copied ? (
                  <span className="flex items-center gap-0.5 font-medium text-emerald-600">
                    <FiCheck size={11} /> Copied
                  </span>
                ) : (
                  <FiCopy size={11} className="text-gray-400" />
                )}
              </button>

              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                {item.category || "Individual"}
              </span>

              <span className="text-xs font-semibold text-gray-700">
                To: {item.countryName}
              </span>
            </div>
          </div>

          <span className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cfg.badge}`}>
            <StatusIcon size={12} />
            {cfg.label}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-medium text-gray-400">Applicant Name</p>
            <p className="mt-1 text-[13px] font-semibold text-gray-900">{item.applicantName || "—"}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-gray-400">Passport No.</p>
            <p className="mt-1 text-[13px] font-semibold text-gray-900">{item.passportNumber || "—"}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-gray-400">Submitted On</p>
            <p className="mt-1 text-[13px] font-semibold text-gray-900">
              {new Date(item.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit", month: "short", year: "numeric",
              })}
            </p>
          </div>
        </div>

        {item.note && (
          <p className="mt-3 text-xs leading-relaxed text-gray-500">{item.note}</p>
        )}
      </div>
    </div>
  );
};

const AgentVisaHistory = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getMyAgentVisaApplications();
      setApplications(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch agent visa applications:", error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to load your visa applications."
      );
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return applications;

    return applications.filter((item) =>
      [item.referenceNumber, item.visaTitle, item.countryName, item.applicantName, item.passportNumber]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [applications, query]);

  const approvedCount = applications.filter((a) => a.status === "Approved").length;
  const holdCount = applications.filter((a) => a.status === "Hold").length;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{agentPageStyles}</style>

      <PageHeader
        title="Applied Visa History"
        count={`${applications.length} Records`}
        subtitle="Visa applications you've submitted through your agent account."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard dark icon={FiGlobe} label="Total Applications" value={applications.length} delay={0.08} />
        <StatCard icon={FiCheckCircle} tone="emerald" label="Approved" value={approvedCount} delay={0.14} />
        <StatCard icon={FiAlertTriangle} tone="red" label="On Hold" value={holdCount} delay={0.2} />
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by reference, country, applicant or passport no..."
        delay={0.26}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : errorMessage ? (
        <ErrorState message={errorMessage} onRetry={fetchApplications} />
      ) : filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((item, index) => (
            <VisaRow key={item._id} item={item} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FiGlobe}
          title={query ? "No applications match your search" : "No visa applications yet"}
          message={
            query
              ? "Try a different reference, country or applicant name."
              : "Visa applications you submit will show up here."
          }
          isFiltering={!!query}
          onClear={() => setQuery("")}
        />
      )}
    </div>
  );
};

export default AgentVisaHistory;
