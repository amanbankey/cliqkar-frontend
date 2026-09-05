import React, { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiMapPin,
  FiLock,
  FiCamera,
  FiCheckCircle,
  FiUploadCloud,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiCalendar,
  FiMail,
  FiGlobe,
  FiShield,
  FiRotateCcw,
  FiSave,
  FiFileText,
  FiCreditCard,
  FiHome,
} from "react-icons/fi";



const profile = {
  name: "Aarav V. Singhania",
  tier: "Platinum Partner",
  initials: "AS",
};

const complianceDocs = [
  { icon: FiCreditCard, title: "PAN Card Front", file: "PAN_Card_Signed.pdf" },
  { icon: FiFileText, title: "Address Proof (Front)", file: "Utility_Oct2025.pdf" },
  { icon: FiFileText, title: "Address Proof (Back)", file: "Lease_Deed_Signed.pdf" },
  { icon: FiHome, title: "Office Premises Proof", file: "Office_Facade.jpg" },
];

const MyProfile = () => {
  const [personalData, setPersonalData] = useState({
    fullName: "Vivan Travels",
    email: "mail@vivantravels.com",
    countryCode: "+91",
    mobile: "98290 12345",
    nationality: "India (IN)",
    dob: "18 Sep 1988",
    gender: "Male",
    address: "Suite 402, J.G Heights, Civil Lines, Ajmer, Rajasthan, 305001",
  });

  const [businessData, setBusinessData] = useState({
    companyName: "Vivan Travels & Tourism Pvt. Ltd.",
    ownershipStructure: "Private Limited",
    gstRegistered: true,
    gstNumber: "08AACCV1234F1Z5",
    gstCertificate: null,
  });

  const [addressData, setAddressData] = useState({
    officeAddress: "J.G Heights, Near Kutchery Road",
    city: "Ajmer",
    state: "Rajasthan",
    pincode: "305001",
    altMobile1: "+91 94140 54321",
    altMobile2: "+91 98291 99887",
    billingEmail: "billing@vivantravels.com",
    panNumber: "BGTPT8352C",
    websiteUrl: "https://www.vivantravels.com",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "Vivan#AeroGDS$2026",
    confirmPassword: "Vivan#AeroGDS$2026",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handlePersonalChange = (e) => setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  const handleBusinessChange = (e) => setBusinessData({ ...businessData, [e.target.name]: e.target.value });
  const handleAddressChange = (e) => setAddressData({ ...addressData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const submitForm = async (endpoint, data) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await response.json();
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();
    submitForm("/api/user/profile/personal", personalData);
  };

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    submitForm("/api/user/profile/business", businessData);
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    submitForm("/api/user/profile/address", addressData);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    submitForm("/api/user/profile/password", passwordData);
  };

  const handleSaveAll = async () => {
    await Promise.all([
      submitForm("/api/user/profile/personal", personalData),
      submitForm("/api/user/profile/business", businessData),
      submitForm("/api/user/profile/address", addressData),
    ]);
  };

  const passwordsMatch = passwordData.newPassword && passwordData.newPassword === passwordData.confirmPassword;

  return (
   

        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto  ">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Agency Profile &amp; KYC Verification</h1>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <FiCheckCircle size={13} /> Tier 3 IATA &amp; DGCA Accredited
              </p>
              <p className="mt-1 text-sm text-gray-500">Manage your credentials, business identification, and account security</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiRotateCcw size={14} /> Audit Trail
              </button>
              <button onClick={handleSaveAll} className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-3.5 py-2.5 rounded-lg whitespace-nowrap">
                <FiSave size={14} /> Save All Changes
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <span className="w-16 h-16 rounded-full bg-blue-900 text-white text-lg font-bold flex items-center justify-center">
                  {profile.initials}
                </span>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>
              <div>
                <p className="flex items-center gap-2 flex-wrap text-base font-bold text-gray-900">
                  {profile.name} <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-full">Authorized Signatory</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG max 5MB. 400x400px recommended</p>
                <div className="mt-2 flex items-center gap-2">
                  <button className="flex items-center gap-1.5 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-3 py-2 rounded-lg">
                    <FiCamera size={13} /> Upload New Photo
                  </button>
                  <button className="text-gray-500 text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100">Remove</button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 text-xs space-y-1.5 w-full md:w-auto">
              <p className="flex items-center gap-1.5 font-semibold text-gray-700">
                KYC STATUS <span className="flex items-center gap-1 text-emerald-600"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Approved &amp; Verified (100%)</span>
              </p>
              <p className="flex justify-between gap-6 text-gray-500">Partner ID: <span className="font-bold text-gray-800">CLQ-VT-984201</span></p>
              <p className="flex justify-between gap-6 text-gray-500">GDS Agent Code: <span className="font-bold text-gray-800">DEL-1A-9812</span></p>
              <p className="flex justify-between gap-6 text-gray-500">Last Security Review: <span className="font-bold text-gray-800">24 Oct 2025</span></p>
            </div>
          </div>

          <form onSubmit={handlePersonalSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="flex items-center gap-2 text-base font-bold text-gray-900">
                <FiUser className="text-gray-400" /> Personal Information
              </p>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">Admin Identity</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 mb-5">Primary travel agent administrator details</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Full Name</label>
                <input
                  name="fullName"
                  value={personalData.fullName}
                  onChange={handlePersonalChange}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Email Address</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <FiMail className="text-gray-400 flex-shrink-0" size={14} />
                  <input
                    name="email"
                    value={personalData.email}
                    onChange={handlePersonalChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 whitespace-nowrap">
                    <FiCheckCircle size={11} /> Verified
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Mobile Number</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <span className="text-sm text-gray-600">{personalData.countryCode}</span>
                  <FiChevronDown className="text-gray-400" size={12} />
                  <input
                    name="mobile"
                    value={personalData.mobile}
                    onChange={handlePersonalChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Nationality</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <input
                    name="nationality"
                    value={personalData.nationality}
                    onChange={handlePersonalChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                  <FiChevronDown className="text-gray-400" size={13} />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Date of Birth</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <FiCalendar className="text-gray-400 flex-shrink-0" size={14} />
                  <input
                    name="dob"
                    value={personalData.dob}
                    onChange={handlePersonalChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Gender</label>
                <div className="mt-1 grid grid-cols-3 gap-2">
                  {["Male", "Female", "Other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPersonalData({ ...personalData, gender: option })}
                      className={`text-sm font-medium py-2.5 rounded-lg ${
                        personalData.gender === option ? "bg-blue-950 text-white" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500">Full Residential / Office Address</label>
                <textarea
                  name="address"
                  value={personalData.address}
                  onChange={handlePersonalChange}
                  rows={2}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none resize-none"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button type="submit" className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                <FiSave size={13} /> Save Personal Details
              </button>
            </div>
          </form>

          <form onSubmit={handleBusinessSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="flex items-center gap-2 text-base font-bold text-gray-900">
                <FiBriefcase className="text-gray-400" /> Business &amp; Legal Entity Details
              </p>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">GST Active</span>
            </div>
            <p className="text-xs text-gray-400 mt-1 mb-5">Registered company identity &amp; Indian Goods and Services Tax credentials</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">Company Name</label>
                <input
                  name="companyName"
                  value={businessData.companyName}
                  onChange={handleBusinessChange}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Ownership Structure</label>
                <select
                  name="ownershipStructure"
                  value={businessData.ownershipStructure}
                  onChange={handleBusinessChange}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
                >
                  <option>Private Limited</option>
                  <option>Partnership</option>
                  <option>Sole Proprietorship</option>
                  <option>LLP</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">Registered for GST?</p>
                <p className="text-xs text-gray-500 mt-0.5">Agency has valid Indian GSTIN for tax invoice pass-through and input credit reclamation.</p>
              </div>
              <button
                type="button"
                onClick={() => setBusinessData({ ...businessData, gstRegistered: !businessData.gstRegistered })}
                className={`w-11 h-6 rounded-full flex items-center px-1 flex-shrink-0 ${businessData.gstRegistered ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"}`}
              >
                <span className="w-[18px] h-[18px] bg-white rounded-full" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500">GST Number (GSTIN)</label>
                <div className="mt-1 flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5">
                  <input
                    name="gstNumber"
                    value={businessData.gstNumber}
                    onChange={handleBusinessChange}
                    className="flex-1 text-sm font-semibold text-gray-700 focus:outline-none"
                  />
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 whitespace-nowrap">
                    <FiCheckCircle size={11} /> Validated
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Tax Rate Regime</label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-2.5 rounded-lg">5% Air Economy</span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-2.5 rounded-lg">12% Business &amp; First</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs text-gray-500">GST Registration Certificate</label>
              <div className="mt-1 border border-dashed border-gray-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <FiUploadCloud size={16} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      GST_Certificate_Vivan_2024.pdf <span className="font-normal text-gray-400">(1.8 MB)</span>{" "}
                      <span className="text-emerald-600 font-semibold">✓ Uploaded &amp; Signed</span>
                    </p>
                    <p className="text-[11px] text-gray-400">Drop GST certificate here or browse (PDF, PNG up to 10MB)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button type="button" className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg">Re-upload</button>
                  <button type="button" className="text-blue-600 text-xs font-semibold">Preview</button>
                </div>
              </div>
            </div>
          </form>

          <form onSubmit={handleAddressSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="flex items-center gap-2 text-base font-bold text-gray-900">
                <FiMapPin className="text-gray-400" /> Corporate Address &amp; KYC Documentation
              </p>
              <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                <FiShield size={11} /> 4/4 Verified
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 mb-5">Official agency headquarters verification &amp; regulatory documents</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-gray-500">Office Address</label>
                <input name="officeAddress" value={addressData.officeAddress} onChange={handleAddressChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500">City</label>
                <input name="city" value={addressData.city} onChange={handleAddressChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500">State</label>
                <input name="state" value={addressData.state} onChange={handleAddressChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Pincode</label>
                <input name="pincode" value={addressData.pincode} onChange={handleAddressChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 focus:outline-none" />
              </div>

              <div>
                <label className="text-xs text-gray-500">Alternative Mobile 1</label>
                <input name="altMobile1" value={addressData.altMobile1} onChange={handleAddressChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Alternative Mobile 2</label>
                <input name="altMobile2" value={addressData.altMobile2} onChange={handleAddressChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none" />
              </div>
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="text-xs text-gray-500">Corporate Billing Email</label>
                <input name="billingEmail" value={addressData.billingEmail} onChange={handleAddressChange} className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none" />
              </div>

              <div>
                <label className="text-xs text-gray-500">PAN Card Number</label>
                <div className="mt-1 flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2.5">
                  <input name="panNumber" value={addressData.panNumber} onChange={handleAddressChange} className="flex-1 text-sm font-semibold text-gray-700 focus:outline-none" />
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 whitespace-nowrap">
                    <FiCheckCircle size={11} /> Valid
                  </span>
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="text-xs text-gray-500">Official Website URL</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <FiGlobe className="text-gray-400 flex-shrink-0" size={14} />
                  <input name="websiteUrl" value={addressData.websiteUrl} onChange={handleAddressChange} className="flex-1 text-sm text-gray-700 focus:outline-none" />
                </div>
              </div>
            </div>

            <p className="mt-6 text-[11px] font-semibold text-gray-400 tracking-wide">REGULATORY COMPLIANCE DOSSIER</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {complianceDocs.map(({ icon: Icon, title, file }) => (
                <div key={title} className="border border-dashed border-gray-300 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center">
                      <Icon size={14} />
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                      <FiCheckCircle size={10} /> Verified
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-gray-800">{title}</p>
                  <p className="text-[11px] text-gray-400">{file}</p>
                  <button type="button" className="mt-3 w-full bg-gray-100 text-gray-600 text-xs font-semibold py-2 rounded-lg">Replace</button>
                </div>
              ))}
            </div>
          </form>

          <form onSubmit={handlePasswordSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="flex items-center gap-2 text-base font-bold text-gray-900">
                <FiLock className="text-gray-400" /> Security &amp; Password Update
              </p>
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500">
                <FiLock size={11} /> End-to-End Encrypted Session
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 mb-5">Maintain GDS session token safety and account authentication</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-gray-500">Current Password</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="text-gray-400 flex-shrink-0">
                    {showCurrent ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">New Password</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="text-gray-400 flex-shrink-0">
                    {showNew ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-emerald-600">Strong Password</span>
                  <span className="text-[11px] text-gray-400">Entropy: High</span>
                </div>
                <div className="mt-1 flex gap-1">
                  {[1, 2, 3].map((bar) => (
                    <span key={bar} className="flex-1 h-1 bg-emerald-500 rounded-full" />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Confirm New Password</label>
                <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                  {passwordsMatch && <FiCheckCircle className="text-emerald-500 flex-shrink-0" size={14} />}
                </div>
                {passwordsMatch && <p className="mt-2 text-[11px] font-semibold text-emerald-600">✓ Passwords match</p>}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button type="submit" className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg">
                <FiLock size={13} /> Update Password
              </button>
            </div>
          </form>

          <div className="bg-[#0B1120] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0">
                <FiShield size={18} />
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm sm:text-base font-bold text-white">Cliqkar Diplomatic &amp; FinTech Security Vault</p>
                  <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full">ISO 27001 &amp; SOC 2 Type II</span>
                </div>
                <p className="mt-1 text-xs text-gray-400 max-w-lg">
                  Bank-grade 256-bit encryption for Indian travel agencies. 24/7 Agent Desk active for Vivan Travels.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              <button className="bg-white text-gray-900 text-xs font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap">24/7 Agent Helpdesk</button>
              <button className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg whitespace-nowrap">Export Compliance Dossier (PDF)</button>
            </div>
          </div>
        </div>
      
  );
};

export default MyProfile;