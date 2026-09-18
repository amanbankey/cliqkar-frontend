import React, { useEffect, useMemo, useState } from "react";
import {
  FiGrid,
  FiDownload,
  FiAlertTriangle,
  FiSearch,
  FiChevronDown,
  FiFilter,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiCheck,
  FiX,
  FiHome,
  FiEye,
  FiEdit2,
  FiRefreshCw,
  FiLoader,
  FiFileText,
  FiExternalLink,
} from "react-icons/fi";
import { BsHourglassSplit } from "react-icons/bs";
import {
  getOtbApplications,
  getOtbApplicationStats,
  getOtbApplicationById,
  updateOtbApplication,
} from "../../api/otbApplicationApi";

const statusPillStyle = {
  Approved: "bg-emerald-50 text-emerald-600",
  Rejected: "bg-red-50 text-red-600",
  Pending: "bg-blue-50 text-blue-600",
  "In Process": "bg-amber-50 text-amber-600",
};

const emptyStats = { total: 0, pending: 0, approved: 0, rejected: 0, today: 0 };

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return (parts.slice(0, 2).map((part) => part[0]).join("") || "OTB").toUpperCase();
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatAmount(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function documentUrl(url) {
  return url || "";
}

const StatCard = ({ label, value, icon: Icon, iconColor, iconBg, valueColor, border }) => (
  <div className={`bg-white border border-gray-200 border-l-4 ${border} rounded-xl p-4 flex items-center justify-between`}>
    <div>
      <p className="text-[11px] font-semibold tracking-wide text-gray-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${valueColor}`}>{value}</p>
    </div>
    <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
      <Icon className={iconColor} size={16} />
    </div>
  </div>
);

function DocumentLink({ label, document }) {
  if (!document?.url) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-3">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="text-xs text-gray-400 mt-1">No file uploaded</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="text-xs text-gray-700 truncate mt-1">{document.originalName || document.fileName || "Uploaded document"}</p>
      </div>
      <a
        href={documentUrl(document.url)}
        target="_blank"
        rel="noreferrer"
        className="flex-shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
      >
        View <FiExternalLink size={12} />
      </a>
    </div>
  );
}

function ViewApplicationModal({ application, onClose }) {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-400">OTB APPLICATION</p>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Application Details</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <FiX size={17} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            <Info label="Reference Number" value={application.referenceNumber} />
            <Info label="Country" value={application.countryName || application.goingTo?.countryName} />
            <Info label="Name" value={application.travelers?.[0]?.fullName} />
            <Info label="PNR" value={application.travelers?.[0]?.pnr} />
            <Info label="Date of Birth" value={formatDate(application.travelers?.[0]?.dob)} />
            <Info label="Airlines" value={application.airlineName || application.airline?.name} />
            <Info label="Amount" value={formatAmount(application.totalAmount)} />
            <Info label="OTB Type" value={application.travelers?.length > 1 ? "group" : "individual"} />
            <Info label="Status" value={application.status} />
            <Info label="Working Status" value={application.workingStatus || application.status} />
            <Info label="Applied User" value={application.applicantEmail} />
            <Info label="Phone" value={application.applicantPhone} />
            <Info label="Agent" value={application.agentName} />
            <Info label="Payment Status" value={application.paymentStatus} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiFileText className="text-blue-600" />
              <h3 className="text-sm font-bold text-gray-900">Documents</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DocumentLink label="Passport Front Side" document={application.travelers?.[0]?.passportFront} />
              <DocumentLink label="Passport Back Side" document={application.travelers?.[0]?.passportBack} />
              <DocumentLink label="Visa" document={application.travelers?.[0]?.visa} />
              <DocumentLink label="From Ticket" document={application.travelers?.[0]?.fromTicket} />
              <DocumentLink label="To Ticket" document={application.travelers?.[0]?.toTicket} />
            </div>
          </div>

          {application.travelers?.length > 1 && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-3">All Travelers</h3>
              <div className="overflow-x-auto border border-gray-200 rounded-xl">
                <table className="w-full min-w-[650px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Name</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">PNR</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">DOB</th>
                      <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Documents</th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.travelers.map((traveler, index) => {
                      const docs = [traveler.passportFront, traveler.passportBack, traveler.visa, traveler.fromTicket, traveler.toTicket].filter(Boolean).length;
                      return (
                        <tr key={traveler._id || index} className="border-t border-gray-100">
                          <td className="px-4 py-3 text-sm text-gray-800">{traveler.fullName}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-blue-600">{traveler.pnr}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{formatDate(traveler.dob)}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{docs}/5 uploaded</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {application.adminNote && (
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
              <p className="text-xs font-semibold text-gray-500">Admin Note</p>
              <p className="text-sm text-gray-700 mt-1">{application.adminNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-900">{label}:</p>
      <p className="text-sm text-gray-600 mt-1">{value || "—"}</p>
    </div>
  );
}

function EditApplicationModal({ application, onClose, onSaved }) {
  const [status, setStatus] = useState(application?.status || "Pending");
  const [workingStatus, setWorkingStatus] = useState(application?.workingStatus || application?.status || "Pending");
  const [paymentStatus, setPaymentStatus] = useState(application?.paymentStatus || "Pending");
  const [adminNote, setAdminNote] = useState(application?.adminNote || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      const response = await updateOtbApplication(application._id, {
        status,
        workingStatus,
        paymentStatus,
        adminNote,
      });
      if (!response?.success) throw new Error(response?.message || "Update failed.");
      onSaved(response.data);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Unable to update application.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl">
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400">EDIT APPLICATION</p>
            <h2 className="text-lg font-bold text-gray-900 mt-1">{application.referenceNumber || "OTB Application"}</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500"><FiX size={17} /></button>
        </div>

        <div className="p-5 space-y-4">
          {error && <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm p-3">{error}</div>}

          <SelectField label="Status" value={status} onChange={setStatus} options={["Pending", "In Process", "Approved", "Rejected"]} />
          <SelectField label="Working Status" value={workingStatus} onChange={setWorkingStatus} options={["Pending", "In Process", "Approved", "Rejected"]} />
          <SelectField label="Payment Status" value={paymentStatus} onChange={setPaymentStatus} options={["Pending", "Paid", "Failed", "Not Required"]} />

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">Admin Note</label>
            <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} rows={4} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none" placeholder="Add a note for this application..." />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button onClick={onClose} disabled={saving} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">Cancel</button>
            <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#0B1120] text-white text-sm font-semibold disabled:opacity-50 inline-flex items-center gap-2">
              {saving && <FiLoader className="animate-spin" size={15} />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 mb-2">{label}</label>
      <div className="relative">
        <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 bg-white">
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
      </div>
    </div>
  );
}

const AppliedOTB = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(emptyStats);
  const [search, setSearch] = useState({ query: "", status: "", airline: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 15, totalPages: 1 });
  const [viewApplication, setViewApplication] = useState(null);
  const [editApplication, setEditApplication] = useState(null);

  const loadStats = async () => {
    try {
      const response = await getOtbApplicationStats();
      if (response?.success) setStats({ ...emptyStats, ...(response.data || {}) });
    } catch (err) {
      console.error("OTB stats failed", err);
    }
  };

  const loadApplications = async (page = 1, customSearch = search) => {
    try {
      setLoading(true);
      setError("");
      const response = await getOtbApplications({
        page,
        limit: 15,
        query: customSearch.query || undefined,
        status: customSearch.status || undefined,
        airline: customSearch.airline || undefined,
        date: customSearch.date || undefined,
      });
      if (!response?.success) throw new Error(response?.message || "Unable to load OTB applications.");
      setApplications(response.data || []);
      setPagination(response.pagination || { total: 0, page, limit: 15, totalPages: 1 });
    } catch (err) {
      console.error("OTB applications load failed", err);
      setApplications([]);
      setError(err?.response?.data?.message || err?.message || "Unable to load OTB applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    loadApplications(1);
    // Initial load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (e) => {
    setSearch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearchSubmit = async (e) => {
    e?.preventDefault?.();
    await loadApplications(1, search);
  };

  const handleReset = async () => {
    const next = { query: "", status: "", airline: "", date: "" };
    setSearch(next);
    await loadApplications(1, next);
  };

  const handleView = async (id) => {
    try {
      const response = await getOtbApplicationById(id);
      if (response?.success) setViewApplication(response.data);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Unable to open application.");
    }
  };

  const handleSaved = (updated) => {
    setApplications((prev) => prev.map((item) => item._id === updated._id ? updated : item));
    loadStats();
  };

  const airlineOptions = useMemo(() => {
    const names = applications.map((item) => item.airlineName || item.airline?.name).filter(Boolean);
    return [...new Set(names)];
  }, [applications]);

  const statCards = [
    { label: "TOTAL", value: stats.total, icon: FiGrid, iconColor: "text-gray-500", iconBg: "bg-gray-100", valueColor: "text-gray-900", border: "border-l-gray-300" },
    { label: "PENDING", value: stats.pending, icon: BsHourglassSplit, iconColor: "text-blue-500", iconBg: "bg-blue-50", valueColor: "text-blue-600", border: "border-l-blue-400" },
    { label: "APPROVED", value: stats.approved, icon: FiCheckCircle, iconColor: "text-emerald-500", iconBg: "bg-emerald-50", valueColor: "text-emerald-600", border: "border-l-emerald-400" },
    { label: "REJECTED", value: stats.rejected, icon: FiXCircle, iconColor: "text-red-500", iconBg: "bg-red-50", valueColor: "text-red-600", border: "border-l-red-400" },
    { label: "TODAY", value: stats.today, icon: FiCalendar, iconColor: "text-gray-500", iconBg: "bg-gray-100", valueColor: "text-gray-900", border: "border-l-gray-300" },
  ];

  const start = pagination.total ? ((pagination.page - 1) * pagination.limit) + 1 : 0;
  const end = Math.min(pagination.page * pagination.limit, pagination.total || 0);

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <main className="flex-1 min-w-0 min-h-screen bg-gray-50 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-400 mb-1">OPERATIONS <span className="mx-1">›</span> VISA MANAGEMENT <span className="mx-1">›</span> <span className="text-[#0B1120] font-bold">APPLIED OTB</span></p>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">Applied OTB</h1>
              <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full">{stats.total} Applications</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl">
              <FiDownload size={15} /> Export CSV
            </button>
            <button type="button" onClick={() => loadApplications(pagination.page)} className="flex items-center gap-2 bg-[#0B1120] text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
              <FiRefreshCw size={15} /> Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 mb-4">
          {statCards.map((card) => <StatCard key={card.label} {...card} />)}
        </div>

        <div className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-amber-500 flex-shrink-0" size={16} />
            <p className="text-sm text-gray-700"><span className="font-semibold">Applied OTB:</span> Review submitted applications and update their working status.</p>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="bg-white border border-gray-200 rounded-xl p-3 mb-4">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
              <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
              <input type="text" name="query" value={search.query} onChange={handleSearchChange} placeholder="Search Email, Name, Reference or PNR..." className="w-full text-sm text-gray-700 focus:outline-none" />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-w-[150px]">
              <select name="status" value={search.status} onChange={handleSearchChange} className="w-full text-sm text-gray-700 focus:outline-none bg-transparent">
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Process">In Process</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <FiChevronDown className="text-gray-400 flex-shrink-0" size={14} />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-w-[150px]">
              <select name="airline" value={search.airline} onChange={handleSearchChange} className="w-full text-sm text-gray-700 focus:outline-none bg-transparent">
                <option value="">All Airlines</option>
                {airlineOptions.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
              <FiChevronDown className="text-gray-400 flex-shrink-0" size={14} />
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-w-[150px]">
              <input type="date" name="date" value={search.date} onChange={handleSearchChange} className="w-full text-sm text-gray-700 focus:outline-none bg-transparent" />
            </div>
            <button type="submit" className="flex items-center justify-center border border-gray-200 rounded-lg px-3 py-2.5 text-gray-600 hover:bg-gray-50"><FiFilter size={16} /></button>
            <button type="button" onClick={handleReset} className="flex items-center justify-center border border-gray-200 rounded-lg px-4 py-2.5 text-gray-600 text-sm font-semibold hover:bg-gray-50">Reset</button>
          </div>
        </form>

        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-wrap gap-2">
            <p className="text-sm font-bold text-gray-900">Applied OTB Applications</p>
            <p className="text-xs text-gray-400">{pagination.total ? `Showing ${start}-${end} of ${pagination.total}` : "No applications"}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">SL</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">APPLICANT &amp; AGENT</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">COUNTRY</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">NAME</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">PNR</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">DOB</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">AIRLINES</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">AMOUNT</th>
                  <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">STATUS</th>
                  <th className="text-right text-xs font-semibold text-gray-500 px-4 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="10" className="py-20 text-center"><FiLoader size={25} className="text-blue-600 animate-spin mx-auto mb-3" /><p className="text-sm font-semibold text-gray-600">Loading Applied OTB applications...</p></td></tr>
                ) : applications.length === 0 ? (
                  <tr><td colSpan="10" className="py-20 text-center"><p className="text-sm font-semibold text-gray-700">No OTB applications found</p><p className="text-xs text-gray-400 mt-1">Submitted user applications will appear here.</p></td></tr>
                ) : (
                  applications.map((app, index) => {
                    const firstTraveler = app.travelers?.[0] || {};
                    const applicantName = firstTraveler.fullName || "Unknown Applicant";
                    const airlineName = app.airlineName || app.airline?.name || "—";
                    const countryName = app.countryName || app.goingTo?.countryName || "—";
                    return (
                      <tr key={app._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70">
                        <td className="px-4 py-4 text-sm text-gray-500">{(pagination.page - 1) * pagination.limit + index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{getInitials(applicantName)}</span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate max-w-[190px]">{applicantName || "—"}</p>
                              {/*<div className="flex items-center gap-1 text-xs text-gray-500"><FiHome size={11} />{app.agentName || "—"}</div>*/}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{countryName}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-800">{applicantName}</td>
                        <td className="px-4 py-4"><p className="text-sm font-semibold text-blue-600">{firstTraveler.pnr || "—"}</p></td>
                        <td className="px-4 py-4 text-sm text-gray-600">{formatDate(firstTraveler.dob)}</td>
                        <td className="px-4 py-4 text-sm text-gray-700">{airlineName}</td>
                        <td className="px-4 py-4"><p className="text-sm font-bold text-gray-900">{formatAmount(app.totalAmount)}</p><p className={`flex items-center gap-1 text-xs mt-0.5 ${app.paymentStatus === "Paid" ? "text-emerald-600" : "text-gray-400"}`}>{app.paymentStatus || "Pending"}</p></td>
                        <td className="px-4 py-4"><span className={`text-xs font-semibold px-3 py-1.5 rounded-full w-fit block ${statusPillStyle[app.status] || "bg-gray-100 text-gray-600"}`}>{app.status || "Pending"}</span></td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button type="button" onClick={() => handleView(app._id)} title="View complete details" className="w-9 h-9 rounded-lg border border-cyan-200 text-cyan-500 hover:bg-cyan-50 inline-flex items-center justify-center"><FiEye size={15} /></button>
                            <button type="button" onClick={() => setEditApplication(app)} title="Update status" className="w-9 h-9 rounded-lg border border-pink-200 text-pink-500 hover:bg-pink-50 inline-flex items-center justify-center"><FiEdit2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">{pagination.total ? `Showing ${start}-${end} of ${pagination.total} applications` : "No applications"}</p>
            <div className="flex items-center gap-2">
              <button type="button" disabled={pagination.page <= 1 || loading} onClick={() => loadApplications(pagination.page - 1)} className="border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg disabled:opacity-40">Previous</button>
              <span className="min-w-[36px] h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">{pagination.page}</span>
              <button type="button" disabled={pagination.page >= pagination.totalPages || loading} onClick={() => loadApplications(pagination.page + 1)} className="border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-2 rounded-lg disabled:opacity-40">Next</button>
            </div>
          </div>
        </div>
      </main>

      {viewApplication && <ViewApplicationModal application={viewApplication} onClose={() => setViewApplication(null)} />}
      {editApplication && <EditApplicationModal application={editApplication} onClose={() => setEditApplication(null)} onSaved={handleSaved} />}
    </div>
  );
};

export default AppliedOTB;
