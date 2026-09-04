import React, { useState } from "react";
import {
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiSettings,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiCreditCard,
  FiCamera,
  FiFileText,
  FiUser,
  FiMapPin,
  FiFolder,
} from "react-icons/fi";

const initialCountries = [
  { sl: "01", flag: "🇦🇫", name: "Afghanistan", iso: "AF", currencyCode: "AFN", currencyName: "Afghani", visa: true, otb: false, status: "Active" },
  { sl: "02", flag: "🇦🇱", name: "Albania", iso: "AL", currencyCode: "ALL", currencyName: "Lek", visa: true, otb: false, status: "Active" },
  { sl: "03", flag: "🇩🇿", name: "Algeria", iso: "DZ", currencyCode: "DZD", currencyName: "Dinar", visa: true, otb: false, status: "Active" },
  { sl: "04", flag: "🇦🇸", name: "American Samoa", iso: "AS", currencyCode: "USD", currencyName: "US Dollar", visa: true, otb: false, status: "Active" },
];

const statCards = [
  { label: "TOTAL COUNTRIES", value: "192", valueColor: "text-gray-900" },
  { label: "VISA ENABLED", value: "192", valueColor: "text-blue-600" },
  { label: "OTB ENABLED", value: "12", valueColor: "text-orange-500", tag: "Detail" },
  { label: "CURRENCIES", value: "140+", valueColor: "text-gray-900", tag: "Active" },
];

const identityFields = [
  { icon: FiCreditCard, label: "Passport Front Scan", visible: true, mandatory: true },
  { icon: FiCreditCard, label: "Passport Back Scan", visible: true, mandatory: true },
  { icon: FiFileText, label: "Passport Number", visible: true, mandatory: true },
  { icon: FiCamera, label: "Applicant Photo", visible: true, mandatory: true },
  { icon: FiFileText, label: "PAN Card Upload", visible: true, mandatory: true },
];

const personalFields = [
  { icon: FiMapPin, label: "Place of Birth", visible: false, mandatory: true },
  { icon: FiUser, label: "First Name", visible: true, mandatory: true },
];

const customFields = [{ icon: FiFolder, label: "Additional Supporting Documents Folder", visible: true, mandatory: true }];

const ToggleSwitch = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${checked ? "bg-blue-600 justify-end" : "bg-gray-200 justify-start"}`}
  >
    <span className="w-4 h-4 bg-white rounded-full shadow" />
  </button>
);

const FieldRow = ({ field, onToggle }) => {
  const Icon = field.icon;
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2">
        <Icon className="text-gray-400 flex-shrink-0" size={15} />
        <span className="text-sm text-gray-700">{field.label}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-gray-400 tracking-wide">VISIBLE</span>
          <ToggleSwitch checked={field.visible} onChange={() => onToggle(field.label, "visible")} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold text-gray-400 tracking-wide">MANDATORY</span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              field.mandatory ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500"
            }`}
          >
            {field.mandatory ? "YES" : "NO"}
          </span>
        </div>
      </div>
    </div>
  );
};

const VisaRulesModal = ({ country, onClose }) => {
  const [identity, setIdentity] = useState(identityFields);
  const [personal, setPersonal] = useState(personalFields);
  const [custom, setCustom] = useState(customFields);
  const [folderLabel, setFolderLabel] = useState("modelData");

  const toggleField = (setter) => (label, key) => {
    setter((prev) => prev.map((f) => (f.label === label ? { ...f, [key]: !f[key] } : f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/countries/${country?.iso || "AF"}/visa-rules`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity, personal, custom, folderLabel }),
      });
      await response.json();
      onClose();
    } catch (error) {
      console.error("Failed to save rules", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between px-5 sm:px-6 pt-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Update Visa Application Validation &amp; Form Rules</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-md">
              Configure field visibility, mandatory requirement toggles, and document upload rules for this sovereign country.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap">
              {country?.flag || "🇦🇫"} {country?.name || "Afghanistan"} ({country?.iso || "AF"})
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FiX size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5 space-y-6">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Identity &amp; Passport Credentials</p>
            <div className="bg-gray-50 rounded-xl px-4">
              {identity.map((field) => (
                <FieldRow key={field.label} field={field} onToggle={toggleField(setIdentity)} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Applicant Personal &amp; Family Details</p>
            <div className="bg-gray-50 rounded-xl px-4">
              {personal.map((field) => (
                <FieldRow key={field.label} field={field} onToggle={toggleField(setPersonal)} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Custom &amp; Additional Attachment Rules</p>
            <div className="bg-gray-50 rounded-xl px-4">
              {custom.map((field) => (
                <FieldRow key={field.label} field={field} onToggle={toggleField(setCustom)} />
              ))}
            </div>

            <div className="mt-3">
              <label className="text-xs text-gray-500">Folder Custom Display Label</label>
              <input
                type="text"
                value={folderLabel}
                onChange={(e) => setFolderLabel(e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Enter the custom heading displayed to applicants during document upload.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="text-xs font-semibold text-gray-600 px-4 py-2.5 rounded-lg border border-gray-200">
              Cancel
            </button>
            <button type="submit" className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg">
              Save Validation Rules
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CountriesDirectory = () => {
  const [filters, setFilters] = useState({ country: "", isoCode: "", visaStatus: "", otbStatus: "" });
  const [countries, setCountries] = useState(initialCountries);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/admin/countries/search?${params}`);
      const data = await response.json();
      if (data?.countries) setCountries(data.countries);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleReset = () => {
    setFilters({ country: "", isoCode: "", visaStatus: "", otbStatus: "" });
    setCountries(initialCountries);
  };

  const openRulesModal = (country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  return (
    <div className="flex-1 min-w-0 min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Master Data <span className="mx-1">›</span>
            <span className="text-blue-600 font-medium">Countries</span>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">Global Countries Directory</h1>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-1 rounded-full">192 Countries</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Manage global geographic and administrative parameters.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl h-fit">
          <FiPlus size={16} /> Add Country
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {statCards.map(({ label, value, valueColor, tag }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-200 p-4">
            <p className="text-[10px] font-semibold text-gray-400 tracking-wide mb-1">{label}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${valueColor}`}>{value}</span>
              {tag && <span className="text-[10px] text-gray-400">{tag}</span>}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
            <FiSearch className="text-gray-400 flex-shrink-0" size={16} />
            <input
              type="text"
              name="country"
              value={filters.country}
              onChange={handleChange}
              placeholder="Search Country"
              className="w-full text-sm text-gray-700 focus:outline-none"
            />
          </div>

          <input
            type="text"
            name="isoCode"
            value={filters.isoCode}
            onChange={handleChange}
            placeholder="ISO Code"
            className="lg:w-40 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
          />

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
            <select name="visaStatus" value={filters.visaStatus} onChange={handleChange} className="outline-none bg-transparent w-full">
              <option value="">Visa Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <FiChevronDown size={14} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700">
            <select name="otbStatus" value={filters.otbStatus} onChange={handleChange} className="outline-none bg-transparent w-full">
              <option value="">OTB Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <FiChevronDown size={14} className="text-gray-400" />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg">
              Search
            </button>
            <button type="button" onClick={handleReset} className="border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg">
              Reset
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">SL</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">COUNTRY</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ISO CODE</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">CURRENCY</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">VISA</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">OTB</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((c) => (
                <tr key={c.iso} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-4 text-sm text-gray-500">{c.sl}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <span>{c.flag}</span> {c.name}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">{c.iso}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {c.currencyCode} <span className="text-gray-400">{c.currencyName}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold ${c.visa ? "text-emerald-600" : "text-red-500"}`}>
                      {c.visa ? "✓ Yes" : "— No"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-semibold ${c.otb ? "text-emerald-600" : "text-red-500"}`}>
                      {c.otb ? "✓ Yes" : "— No"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5 w-fit bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => openRulesModal(c)} className="text-gray-400 hover:text-blue-600">
                      <FiSettings size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-500">Showing 1 to 10 of 192 entries</p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg">
              <FiChevronLeft size={14} />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 text-xs font-semibold rounded-lg ${
                  page === 1 ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-gray-400 text-xs">...</span>
            <button className="w-8 h-8 text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg">20</button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 text-gray-500 rounded-lg">
              <FiChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {showModal && <VisaRulesModal country={selectedCountry} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CountriesDirectory;