import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiShield,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
  FiClock,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import { MdFlight } from "react-icons/md";

import { getMyAgentOtbApplications } from "../../api/agentApi";
import {
  agentPageStyles,
  PageHeader,
  StatCard,
  SearchBar,
  LoadingSkeleton,
  ErrorState,
  EmptyState,
} from "./agentPageHelpers";

const getStatusDetails = (status) => {
  switch (status) {
    case "Approved":
      return { label: "OTB Confirmed", icon: FiCheckCircle, badge: "bg-emerald-50 text-emerald-700 ring-emerald-100", strip: "bg-emerald-500" };
    case "Rejected":
      return { label: "Rejected", icon: FiXCircle, badge: "bg-red-50 text-red-700 ring-red-100", strip: "bg-red-400" };
    case "In Process":
      return { label: "Carrier Review in Progress", icon: FiClock, badge: "bg-blue-50 text-blue-700 ring-blue-100", strip: "bg-blue-500" };
    default:
      return { label: "Pending", icon: FiClock, badge: "bg-blue-50 text-blue-700 ring-blue-100", strip: "bg-blue-400" };
  }
};

const OtbRow = ({ application, index }) => {
  const [copied, setCopied] = useState(false);
  const traveler = application?.travelers?.[0];
  const status = getStatusDetails(application?.status);
  const StatusIcon = status.icon;

  const airlineDisplay = application?.airline?.code
    ? `${application.airline.code} ${application?.airlineName || ""}`
    : application?.airlineName || "Airline";

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(application.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className="agp-rise overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
      style={{ animationDelay: `${0.15 + index * 0.07}s` }}
    >
      <div className={`h-1 ${status.strip}`} />

      <div className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800 ring-1 ring-blue-100">
              <MdFlight size={20} className="rotate-90" />
            </span>

            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900">
                <span className="mr-1.5 text-xs font-medium text-gray-400">Ref</span>
                #{application?.referenceNumber || "—"}
              </p>

              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                  {airlineDisplay}
                </span>
                <span className="text-xs font-semibold text-gray-700">
                  To: {application?.countryName || "—"}
                </span>
              </div>
            </div>
          </div>

          <span className={`flex flex-shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 sm:self-center ${status.badge}`}>
            <StatusIcon size={12} />
            {status.label}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 rounded-xl bg-slate-50 p-3.5 sm:grid-cols-3">
          <div>
            <p className="text-[11px] font-medium text-gray-400">Passenger</p>
            <p className="mt-1 text-[13px] font-semibold text-gray-900">{traveler?.fullName || "—"}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-gray-400">PNR</p>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-gray-900">
              {traveler?.pnr || "—"}
              {traveler?.pnr && (
                <button type="button" onClick={copyRef} className="text-gray-400 hover:text-blue-900">
                  {copied ? <FiCheck size={12} className="text-emerald-500" /> : <FiCopy size={12} />}
                </button>
              )}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-gray-400">Submitted On</p>
            <p className="mt-1 text-[13px] font-semibold text-gray-900">
              {application?.createdAt
                ? new Date(application.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentOTBHistory = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getMyAgentOtbApplications();
      setApplications(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch agent OTB applications:", error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to load your OTB applications."
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

    return applications.filter((app) => {
      const traveler = app?.travelers?.[0];
      return [app?.referenceNumber, app?.airlineName, app?.countryName, traveler?.fullName, traveler?.pnr]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [applications, query]);

  const confirmedCount = applications.filter((a) => a.status === "Approved").length;
  const needActionCount = applications.filter((a) => a.status === "Rejected").length;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{agentPageStyles}</style>

      <PageHeader
        title="Applied OTB History"
        count={`${applications.length} Records`}
        subtitle="Ok-To-Board applications you've submitted through your agent account."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard dark icon={FiShield} label="Total Clearances" value={applications.length} delay={0.08} />
        <StatCard icon={FiCheckCircle} tone="emerald" label="Confirmed" value={confirmedCount} delay={0.14} />
        <StatCard icon={FiAlertTriangle} tone="red" label="Rejected" value={needActionCount} delay={0.2} />
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search PNR, reference, passenger or airline..."
        delay={0.26}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : errorMessage ? (
        <ErrorState message={errorMessage} onRetry={fetchApplications} />
      ) : filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((application, index) => (
            <OtbRow key={application._id} application={application} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FiShield}
          title={query ? "No applications match your search" : "No OTB applications yet"}
          message={
            query
              ? "Try a different reference, PNR or passenger name."
              : "OTB applications you submit will show up here."
          }
          isFiltering={!!query}
          onClear={() => setQuery("")}
        />
      )}
    </div>
  );
};

export default AgentOTBHistory;
