import React from "react";
import { NavLink } from "react-router-dom";
import { FaCaretRight } from "react-icons/fa";

const topCities = ["Dubai", "Delhi", "Singapore", "London", "Bangkok", "Tokyo"];

const services = [
  "Okay to Board (OTB)",
  "Visa Clearance API",
  "VIP Airport Concierge",
  "Charter Flight Ops",
  "Timatic Rule Auditing",
];

const company = [
  { label: "About CLIQKAR", path: "/about" },
  { label: "Aviation Partners", path: "/#" },
  { label: "Press & Media", path: "/#" },
  { label: "Careers", path: "/#" },
  { label: "Station Desks", path: "/#" },
];

const legal = [
  "Regulatory Disclosures",
  "Privacy Architecture",
  "Terms of Service",
  "Biometric Data Retention",
  "Security Standards",
];

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="flex items-center gap-1 text-lg font-bold text-white">
            CLIQKAR <FaCaretRight className="text-blue-500" />
          </p>
          <p className="mt-3 text-xs leading-relaxed max-w-xs">
            Luxury aviation intelligence, instant Okay to Board verifications, and VIP global flight protocol
            assurance.
          </p>
          <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> TIMATIC DIRECT API ONLINE
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-wide text-gray-200 mb-4">TOP CITIES</p>
          <ul className="space-y-2.5 text-sm">
            {topCities.map((city) => (
              <li key={city} className="hover:text-white cursor-pointer">{city}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-wide text-gray-200 mb-4">SERVICES</p>
          <ul className="space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service} className="hover:text-white cursor-pointer">{service}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-wide text-gray-200 mb-4">COMPANY</p>
          <ul className="space-y-2.5 text-sm">
            {company.map((item) => (
              <li key={item.label}>
                <NavLink to={item.path} className="hover:text-white cursor-pointer">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-wide text-gray-200 mb-4">LEGAL</p>
          <ul className="space-y-2.5 text-sm">
            {legal.map((item) => (
              <li key={item} className="hover:text-white cursor-pointer">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© 2026 CLIQKAR Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-300">
            <span>IATA ACCREDITED PROTOCOL</span>
            <span>ISO/IEC 27001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;