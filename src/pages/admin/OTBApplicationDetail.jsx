import React, { useState } from "react";
import { X, FileText, User, Phone, Plane, Wallet, Ticket, CreditCard, Clock, Download } from "lucide-react";
 

const otbApplication = {
  status: "APPROVED",
  applicantName: "SAMEERBHAI MANSUKHBHAI MOMTORA",
  ref: "O9J5NH",
  applicationId: "OTB-2023-9842",
  submissionDate: "24 Oct 2023, 10:45 AM",
  agent: "AAMIR DINGI",
  phone: "+91 98765 43210",
  passportNo: "Z1234567",
  origin: "BOM",
  originCountry: "India",
  destination: "DXB",
  destinationCountry: "UAE",
  pnr: "O9J5NH",
  airline: "IndiGo (6E)",
  otbFee: "₹400.00",
  paymentStatus: "Paid",
  totalAmount: "₹400.00",
  passportExpiry: "12 Mar 2029",
  nationality: "Indian",
  ticketClass: "Economy",
  departureDate: "02 Nov 2023",
  travelType: "One Way",
  paymentMethod: "UPI",
  transactionId: "TXN-88213402",
  activity: [
    { label: "Application submitted", by: "AAMIR DINGI", time: "24 Oct 2023, 10:45 AM" },
    { label: "Payment received", by: "System", time: "24 Oct 2023, 10:47 AM" },
    { label: "Application approved", by: "Ops Team", time: "24 Oct 2023, 01:12 PM" },
  ],
};

const InfoRow = ({ label, value, valueClass = "text-gray-800" }) => (
  <div>
    <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">{label}</p>
    <p className={`text-sm font-medium ${valueClass}`}>{value}</p>
  </div>
);
 
const Card = ({ icon: Icon, title, children }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4">
    <p className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
      <Icon className="text-gray-500" size={15} /> {title}
    </p>
    {children}
  </div>
);

const statusStyles = {
  APPROVED: "bg-emerald-50 text-emerald-600",
  REJECTED: "bg-red-50 text-red-500",
  PENDING: "bg-amber-50 text-amber-600",
};

const tabs = ["Overview", "Applicant", "Passport", "Travel / OTB", "Airline & PNR", "Payment", "Activity"];

const OTBApplicationDetailsModal = ({ application = otbApplication, onClose }) => {
  const [activeTab, setActiveTab] = useState("Overview");

  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />

      <div className="relative w-full sm:w-[480px] lg:w-[620px] h-full bg-gray-50 shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-start justify-between gap-3 bg-white px-5 py-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-bold text-gray-900">OTB Application Details</h2>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[application.status] || statusStyles.PENDING}`}>
                {application.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {application.applicantName} <span className="mx-1">•</span> Ref: {application.ref}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-1 bg-white px-5 border-b border-gray-200 overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-3 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {activeTab === "Overview" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card icon={FileText} title="Primary Information">
                  <div className="flex flex-col gap-3">
                    <InfoRow label="Application ID" value={application.applicationId} />
                    <InfoRow label="Submission Date" value={application.submissionDate} />
                    <div>
                      <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">Agent</p>
                      <p className="text-sm font-medium text-blue-600">{application.agent}</p>
                    </div>
                  </div>
                </Card>

                <Card icon={User} title="Applicant Brief">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {application.applicantName.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{application.applicantName}</p>
                      <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Phone size={11} /> {application.phone}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Passport No.</span>
                    <span className="text-sm font-semibold text-gray-800">{application.passportNo}</span>
                  </div>
                </Card>
              </div>

              <Card icon={Plane} title="Travel Summary">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{application.origin}</p>
                    <p className="text-xs text-gray-400">{application.originCountry}</p>
                  </div>
                  <Plane className="text-gray-300 rotate-90" size={18} />
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{application.destination}</p>
                    <p className="text-xs text-gray-400">{application.destinationCountry}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                  <InfoRow label="PNR" value={application.pnr} />
                  <div>
                    <p className="text-[10px] font-semibold tracking-wide text-gray-400 mb-1">Airline</p>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                      <span className="w-2 h-2 rounded-full bg-blue-400" /> {application.airline}
                    </p>
                  </div>
                </div>
              </Card>

              <Card icon={Wallet} title="Financials">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">OTB Fee</span>
                    <span className="font-medium text-gray-800">{application.otbFee}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Payment Status</span>
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {application.paymentStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-sm font-bold text-gray-900">Total Amount</span>
                    <span className="text-sm font-bold text-gray-900">{application.totalAmount}</span>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === "Applicant" && (
            <Card icon={User} title="Applicant Details">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Full Name" value={application.applicantName} />
                <InfoRow label="Nationality" value={application.nationality} />
                <InfoRow label="Phone Number" value={application.phone} />
                <InfoRow label="Agent" value={application.agent} valueClass="text-blue-600" />
              </div>
            </Card>
          )}

          {activeTab === "Passport" && (
            <Card icon={FileText} title="Passport Information">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Passport No." value={application.passportNo} />
                <InfoRow label="Expiry Date" value={application.passportExpiry} />
                <InfoRow label="Nationality" value={application.nationality} />
              </div>
            </Card>
          )}

          {activeTab === "Travel / OTB" && (
            <Card icon={Plane} title="Travel / OTB Details">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Origin" value={`${application.origin} · ${application.originCountry}`} />
                <InfoRow label="Destination" value={`${application.destination} · ${application.destinationCountry}`} />
                <InfoRow label="Departure Date" value={application.departureDate} />
                <InfoRow label="Travel Type" value={application.travelType} />
              </div>
            </Card>
          )}

          {activeTab === "Airline & PNR" && (
            <Card icon={Ticket} title="Airline & PNR">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Airline" value={application.airline} />
                <InfoRow label="PNR" value={application.pnr} />
                <InfoRow label="Class" value={application.ticketClass} />
              </div>
            </Card>
          )}

          {activeTab === "Payment" && (
            <Card icon={CreditCard} title="Payment Details">
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Amount" value={application.totalAmount} />
                <InfoRow label="Method" value={application.paymentMethod} />
                <InfoRow label="Status" value={application.paymentStatus} valueClass="text-emerald-600" />
                <InfoRow label="Transaction ID" value={application.transactionId} />
              </div>
            </Card>
          )}

          {activeTab === "Activity" && (
            <Card icon={Clock} title="Activity Log">
              <div className="flex flex-col gap-4">
                {application.activity.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                      {idx !== application.activity.length - 1 && <span className="flex-1 w-px bg-gray-200 mt-1" />}
                    </div>
                    <div className="pb-1">
                      <p className="text-sm font-medium text-gray-800">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {item.by} <span className="mx-1">•</span> {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 bg-white px-5 py-4 border-t border-gray-200">
          <button onClick={onClose} className="text-sm font-semibold text-gray-600 px-4 py-2">
            Close
          </button>
          <button className="flex items-center gap-2 bg-[#0B1120] hover:bg-[#0B1120]/90 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
            <Download size={15} /> Download OTB Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTBApplicationDetailsModal;