
import React, { useEffect, useState } from "react";

import {
  getAdminVisaApplications,
  updateAdminVisaApplication,
} from "../../api/visaApplicationApi";

const STATUS_OPTIONS = [
  "Pending",
  "In Process",
  "Approved",
  "Rejected",
  "On Hold",
];

const AppliedVisas = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminVisaApplications();

      setApplications(response.applications || []);
    } catch (err) {
      console.error("Applied Visa Error:", err);

      setError(
        err?.response?.data?.message ||
        "Unable to load visa applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    const searchable = [
      app.referenceNumber,
      app.applicant?.name,
      app.applicant?.email,
      app.applicant?.phone,
      app.applicant?.role,
      app.goingFrom,
      app.goingTo,
      app.visa?.going_from,
      app.visa?.going_to,
    ];

    return searchable.some((value) =>
      String(value || "").toLowerCase().includes(query)
    );
  });

  const handleStatusChange = async (id, status) => {
    try {
      setSaving(true);

      const response = await updateAdminVisaApplication(
        id,
        { status }
      );

      const updated = response.application;

      setApplications((previous) =>
        previous.map((item) =>
          item._id === id ? updated : item
        )
      );

      setSelected(updated);
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to update application status."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleNoteSave = async () => {
    if (!selected?._id) return;

    try {
      setSaving(true);

      const response = await updateAdminVisaApplication(
        selected._id,
        { adminNote: selected.adminNote || "" }
      );

      const updated = response.application;

      setApplications((previous) =>
        previous.map((item) =>
          item._id === updated._id ? updated : item
        )
      );

      setSelected(updated);

      alert("Admin note saved successfully.");
    } catch (err) {
      alert(
        err?.response?.data?.message ||
        "Unable to save admin note."
      );
    } finally {
      setSaving(false);
    }
  };

  const pendingCount = applications.filter(
    (app) => app.status === "Pending"
  ).length;

  const approvedCount = applications.filter(
    (app) => app.status === "Approved"
  ).length;

  const inProcessCount = applications.filter(
    (app) => app.status === "In Process"
  ).length;

  const getDocumentUrl = (url) => {
    if (!url) return "#";

    if (url.startsWith("http")) return url;

    return `https://cliqkar-backend.onrender.com${url.startsWith("/") ? url : `/${url}`}`;
  };

  return (
    <main className="flex-1 min-w-0 overflow-y-auto bg-gray-50 p-4 sm:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Applied Visas
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage visa applications submitted by users and agents.
          </p>
        </div>

        <button
          onClick={loadApplications}
          disabled={loading}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={applications.length}
          color="blue"
        />

        <StatCard
          title="Pending"
          value={pendingCount}
          color="amber"
        />

        <StatCard
          title="In Process"
          value={inProcessCount}
          color="indigo"
        />

        <StatCard
          title="Approved"
          value={approvedCount}
          color="emerald"
        />
      </div>

      {/* SEARCH */}
      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reference, applicant, email, phone or destination..."
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-4">Reference</th>
                <th className="px-4 py-4">Applicant</th>
                <th className="px-4 py-4">Applied By</th>
                <th className="px-4 py-4">Destination</th>
                <th className="px-4 py-4">Travel Date</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Payment</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    Loading visa applications...
                  </td>
                </tr>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    No visa applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-4 py-4 font-semibold text-blue-700">
                      {app.referenceNumber || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-800">
                        {app.applicant?.name || "-"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {app.applicant?.email || "-"}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium capitalize text-blue-700">
                        {app.applicant?.role || "User"}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-gray-700">
                      {app.goingTo ||
                        app.visa?.going_to ||
                        "-"}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {app.travelDate || "-"}
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-800">
                      ₹{Number(app.totalAmount ?? app.amount ?? 0).toLocaleString("en-IN")}
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-gray-600">
                        {app.paymentStatus || "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                        {app.status || "Pending"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelected(app)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-6">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Visa Application Details
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {selected.referenceNumber}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 p-5">
              {/* APPLICANT */}
              <section>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Applicant Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail label="Name" value={selected.applicant?.name} />
                  <Detail label="Email" value={selected.applicant?.email} />
                  <Detail label="Phone" value={selected.applicant?.phone} />
                  <Detail label="Applied By" value={selected.applicant?.role} />
                  <Detail label="Reference" value={selected.referenceNumber} />
                  <Detail
                    label="Applied On"
                    value={
                      selected.createdAt
                        ? new Date(selected.createdAt).toLocaleString()
                        : "-"
                    }
                  />
                </div>
              </section>

              {/* VISA */}
              <section>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Visa & Travel Information
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <Detail
                    label="Going From"
                    value={selected.goingFrom || selected.visa?.going_from}
                  />

                  <Detail
                    label="Going To"
                    value={selected.goingTo || selected.visa?.going_to}
                  />

                  <Detail
                    label="Travel Date"
                    value={selected.travelDate}
                  />

                  <Detail
                    label="Return Date"
                    value={selected.returnDate}
                  />

                  <Detail
                    label="Visa Amount"
                    value={`₹${selected.visaTotal ?? selected.amount ?? 0}`}
                  />

                  <Detail
                    label="Insurance"
                    value={selected.insurance ? "Yes" : "No"}
                  />

                  <Detail
                    label="Insurance Amount"
                    value={`₹${selected.insuranceTotal ?? 0}`}
                  />

                  <Detail
                    label="Total Amount"
                    value={`₹${selected.totalAmount ?? selected.amount ?? 0}`}
                  />

                  <Detail
                    label="Payment Status"
                    value={selected.paymentStatus}
                  />
                </div>
              </section>

              {/* TRAVELERS */}
              <section>
                <h3 className="mb-3 font-semibold text-gray-800">
                  Traveler Details ({selected.travelers?.length || 0})
                </h3>

                {(selected.travelers || []).map((traveler, index) => (
                  <div
                    key={traveler._id || index}
                    className="mb-4 rounded-xl border border-gray-200 p-4"
                  >
                    <h4 className="mb-3 font-semibold text-gray-800">
                      Traveler {index + 1}
                    </h4>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {Object.entries(traveler || {})
                        .filter(
                          ([key]) =>
                            !["_id", "id", "__v", "files"].includes(key)
                        )
                        .map(([key, value]) => (
                          <Detail
                            key={key}
                            label={key}
                            value={
                              typeof value === "object"
                                ? JSON.stringify(value)
                                : value
                            }
                          />
                        ))}
                    </div>

                    {traveler.files &&
                      Object.entries(traveler.files).length > 0 && (
                        <div className="mt-4">
                          <h5 className="mb-2 text-sm font-semibold text-gray-700">
                            Uploaded Documents
                          </h5>

                          <div className="flex flex-wrap gap-2">
                            {Object.entries(traveler.files).map(
                              ([key, file]) => (
                                <a
                                  key={key}
                                  href={getDocumentUrl(file?.url)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-100"
                                >
                                  View {file?.originalName || key}
                                </a>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </section>

              {/* ADMIN STATUS */}
              <section className="rounded-xl border border-gray-200 p-4">
                <h3 className="mb-3 font-semibold text-gray-800">
                  Admin Management
                </h3>

                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Application Status
                </label>

                <select
                  value={selected.status || "Pending"}
                  disabled={saving}
                  onChange={(e) =>
                    handleStatusChange(
                      selected._id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 sm:max-w-xs"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <label className="mb-2 mt-4 block text-sm font-medium text-gray-700">
                  Admin Note
                </label>

                <textarea
                  rows="3"
                  value={selected.adminNote || ""}
                  onChange={(e) =>
                    setSelected((previous) => ({
                      ...previous,
                      adminNote: e.target.value,
                    }))
                  }
                  placeholder="Add internal note..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />

                <button
                  onClick={handleNoteSave}
                  disabled={saving}
                  className="mt-3 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Note"}
                </button>
              </section>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    indigo: "border-indigo-100 bg-indigo-50 text-indigo-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
  };

  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="rounded-lg bg-gray-50 p-3">
    <p className="text-xs capitalize text-gray-500">
      {label.replace(/([A-Z])/g, " $1")}
    </p>

    <p className="mt-1 break-words text-sm font-medium text-gray-800">
      {value === null || value === undefined || value === ""
        ? "-"
        : String(value)}
    </p>
  </div>
);

export default AppliedVisas;