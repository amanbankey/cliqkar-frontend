import React, { useState } from "react";
import {
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiMenu,
  FiUploadCloud,
  FiEye,
  FiEyeOff,
  FiSave,
} from "react-icons/fi";
import { MdOutlineAccountBalance } from "react-icons/md";
import Sidebar from "../../components/adminComponent/Sidebar";

const tabs = [
  "Core Agency & Fee Rules",
  "API Integrations & Engines",
  "Payment Gateway",
  "App & Firebase",
  "Support & Ops Desk",
];

const initialForm = {
  adminName: "Cliqkar Operations",
  brandLogo: null,
  masterOverrideKey: "",
  flightAgencyCharge: "350",
  visaAgencyCharge: "500",
  otbBoardCharge: "0",
  childVisaPriceUAE: "6200",
  insuranceBaseUAE: "19",
};

const PlatformIntegrationSettings = ({ setSidebarOpen, sidebarOpen }) => {
  const [activeItem, setActiveItem] = useState("Settings");
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [formData, setFormData] = useState(initialForm);
  const [showKey, setShowKey] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, brandLogo: file }));
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) payload.append(key, value);
    });

    try {
      const response = await fetch("/api/admin/platform-settings", {
        method: "POST",
        body: payload,
      });
      if (!response.ok) throw new Error("Failed to save settings");
    } catch (err) {
      setSaveError("Could not save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 min-w-0 min-h-screen bg-gray-50">
        <div className="flex items-center justify-between gap-4 bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 flex-shrink-0">
              <FiMenu size={20} />
            </button>
            <div className="flex items-center gap-2 text-xs sm:text-sm truncate">
              <span className="font-bold text-blue-600 whitespace-nowrap">Cliqkar Operations</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="hidden sm:flex items-center gap-2 text-gray-400 truncate">
                System <span>›</span> Platform Settings <span>›</span>
                <span className="text-blue-600 font-medium">Master Configuration</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-gray-400 hover:text-gray-600">
              <FiBell size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <FiHelpCircle size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <FiSettings size={18} />
            </button>
            <div className="w-8 h-8 rounded-lg bg-[#0B1120]" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">Platform & Integration Settings</h1>
              <p className="text-sm text-gray-500 mt-1 max-w-xl">
                Manage global agency fees, third-party flight engine APIs, payment gateways, mobile app
                parameters, and support channels.
              </p>
            </div>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl whitespace-nowrap disabled:opacity-60"
            >
              <FiSave size={15} />
              {isSaving ? "Saving..." : "Save All Configurations"}
            </button>
          </div>

          <div className="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-400 border-transparent hover:text-gray-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <p className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-900">
                <MdOutlineAccountBalance className="text-blue-600" size={18} />
                Agency Commercials & Service Markup Rules
              </p>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                PROD ENV
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Admin Name</label>
                  <input
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Brand Logo</label>
                  <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-xl py-6 cursor-pointer hover:bg-gray-50">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Brand logo preview" className="w-12 h-12 object-contain rounded" />
                    ) : (
                      <FiUploadCloud className="text-blue-500" size={22} />
                    )}
                    <span className="text-xs font-semibold text-blue-600">Click to upload new</span>
                    <span className="text-[10px] text-gray-400">SVG, PNG, JPG Max 2MB</span>
                    <input type="file" accept=".svg,.png,.jpg,.jpeg" onChange={handleLogoChange} className="hidden" />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Master Override Key</label>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      name="masterOverrideKey"
                      value={formData.masterOverrideKey}
                      onChange={handleChange}
                      placeholder="••••••••••••••"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(!showKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showKey ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-[11px] font-bold tracking-wide text-gray-500 mb-3">BASE SERVICE CHARGES</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Flight Agency Charge</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                        <input
                          type="number"
                          name="flightAgencyCharge"
                          value={formData.flightAgencyCharge}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Visa Agency Charge</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                        <input
                          type="number"
                          name="visaAgencyCharge"
                          value={formData.visaAgencyCharge}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs text-gray-500 mb-1.5">OTB 30k To Board Charge</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                      <input
                        type="number"
                        name="otbBoardCharge"
                        value={formData.otbBoardCharge}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <p className="text-[11px] font-bold tracking-wide text-gray-500 mb-3">REGIONAL SPECIFIC PRICING (UAE)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Child Visa Price UAE</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                        <input
                          type="number"
                          name="childVisaPriceUAE"
                          value={formData.childVisaPriceUAE}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Insurance Base UAE</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                        <input
                          type="number"
                          name="insuranceBaseUAE"
                          value={formData.insuranceBaseUAE}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All Engine Gateways Connected (Latency: 42ms)
              {saveError && <span className="text-red-500 ml-3">{saveError}</span>}
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFormData(initialForm)}
                className="text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                Reset to Defaults
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl disabled:opacity-60"
              >
                <FiSave size={15} />
                {isSaving ? "Deploying..." : "Update & Deploy Settings"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PlatformIntegrationSettings;