import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiSend,
  FiCheckCircle,
  FiCopy,
  FiCheck,
  FiX,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import { MdFlight } from "react-icons/md";

import { getMyAgentBookings } from "../../api/agentApi";
import {
  agentPageStyles,
  PageHeader,
  StatCard,
  SearchBar,
  LoadingSkeleton,
  ErrorState,
  EmptyState,
  inr,
} from "./agentPageHelpers";

const statusConfig = {
  Success: { badge: "bg-emerald-50 text-emerald-700 ring-emerald-100", dot: "bg-emerald-500", strip: "bg-emerald-500" },
  Processing: { badge: "bg-amber-50 text-amber-700 ring-amber-100", dot: "bg-amber-500", strip: "bg-amber-400" },
  Cancelled: { badge: "bg-red-50 text-red-700 ring-red-100", dot: "bg-red-500", strip: "bg-red-400" },
};

const BookingRow = ({ booking, index }) => {
  const [copied, setCopied] = useState(false);
  const cfg = statusConfig[booking.status] || statusConfig.Processing;
  const isCancelled = booking.status === "Cancelled";

  const copyRef = async () => {
    try {
      await navigator.clipboard.writeText(booking.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className="agp-rise overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5"
      style={{ animationDelay: `${0.15 + index * 0.06}s` }}
    >
      <div className={`h-1 ${cfg.strip}`} />

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-800 ring-1 ring-blue-100">
              <MdFlight size={18} className="rotate-90" />
            </span>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-gray-900">
                {booking.airlineName || "Airline"} {booking.flightNumber ? `• ${booking.flightNumber}` : ""}
              </p>

              <button
                type="button"
                onClick={copyRef}
                className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-400 transition-colors hover:text-blue-900"
              >
                Ref: {booking.referenceNumber}
                {copied ? (
                  <span className="flex items-center gap-0.5 font-medium text-emerald-600">
                    <FiCheck size={11} /> Copied
                  </span>
                ) : (
                  <FiCopy size={11} />
                )}
              </button>
            </div>
          </div>

          <span className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${cfg.badge}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {booking.status}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="min-w-0">
            <p className={`text-xl font-bold tabular-nums ${isCancelled ? "text-gray-400 line-through" : "text-gray-900"}`}>
              {booking.departure?.time || "--:--"}
            </p>
            <p className="text-sm font-semibold text-gray-800">{booking.departure?.code || "—"}</p>
            <p className="text-[11px] text-gray-400">{booking.departure?.airport || ""}</p>
          </div>

          <div className="min-w-0 flex-1 px-1">
            <p className="mb-2 text-center text-[11px] font-medium text-gray-500">
              {booking.duration || ""}
            </p>
            <div className="flex items-center">
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
              <span className="flex-1 border-t border-dashed border-blue-200" />
              <span className="mx-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                <MdFlight size={14} />
              </span>
              <span className="flex-1 border-t border-dashed border-blue-200" />
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
            </div>
          </div>

          <div className="min-w-0 text-right">
            <p className={`text-xl font-bold tabular-nums ${isCancelled ? "text-gray-400 line-through" : "text-gray-900"}`}>
              {booking.arrival?.time || "--:--"}
            </p>
            <p className="text-sm font-semibold text-gray-800">{booking.arrival?.code || "—"}</p>
            <p className="text-[11px] text-gray-400">{booking.arrival?.airport || ""}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 sm:grid-cols-3">
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-gray-400">PASSENGER</p>
            <p className="mt-1 text-xs font-semibold text-gray-800">{booking.passengerName || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-gray-400">PNR</p>
            <p className="mt-1 text-xs font-semibold text-gray-800">{booking.pnr || "—"}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wide text-gray-400">CABIN</p>
            <p className="mt-1 text-xs font-semibold text-gray-800">{booking.cabinClass || "—"}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-lg font-bold text-gray-900">₹ {inr(booking.price)}</p>
          {!!booking.netProfit && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              +₹{inr(booking.netProfit)} Net Profit
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const AgentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getMyAgentBookings();
      setBookings(Array.isArray(data?.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch agent bookings:", error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to load your bookings."
      );
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return bookings;

    return bookings.filter((b) =>
      [b.referenceNumber, b.airlineName, b.flightNumber, b.passengerName, b.pnr]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [bookings, query]);

  const confirmedCount = bookings.filter((b) => b.status === "Success").length;
  const totalValue = bookings
    .filter((b) => b.status !== "Cancelled")
    .reduce((sum, b) => sum + (b.price || 0), 0);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <style>{agentPageStyles}</style>

      <PageHeader
        title="My Bookings"
        count={bookings.length}
        subtitle="Flight bookings you've made through your agent account."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard dark icon={FiSend} label="Total Bookings" value={bookings.length} delay={0.08} />
        <StatCard icon={FiCheckCircle} tone="emerald" label="Confirmed" value={confirmedCount} delay={0.14} />
        <StatCard icon={FiFileText} tone="blue" label="Total Value" value={`₹ ${inr(totalValue, 0)}`} delay={0.2} />
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search by reference, PNR, airline or passenger..."
        delay={0.26}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : errorMessage ? (
        <ErrorState message={errorMessage} onRetry={fetchBookings} />
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filtered.map((booking, index) => (
            <BookingRow key={booking._id} booking={booking} index={index} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FiSend}
          title={query ? "No bookings match your search" : "No bookings yet"}
          message={
            query
              ? "Try a different reference, PNR or passenger name."
              : "Your flight bookings will show up here as soon as you make one."
          }
          isFiltering={!!query}
          onClear={() => setQuery("")}
        />
      )}
    </div>
  );
};

export default AgentBookings;
