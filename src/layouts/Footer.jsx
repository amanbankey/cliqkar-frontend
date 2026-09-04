import { Cloud } from "lucide-react";

const columns = [
  {
    title: "EXPLORE",
    links: [
      "Private Charter",
      "Commercial Flights",
      "OTB Verification",
      "Express Visas",
      "Exclusive Routes",
    ],
  },
  {
    title: "COMPANY",
    links: [
      "About Cliqkar",
      "Google Partnership",
      "Vetted Agent Program",
      "Press & Media",
      "Careers",
    ],
  },
  {
    title: "SUPPORT",
    links: [
      "24/7 VIP Concierge",
      "Flight Status Engine",
      "OTB Status Portal",
      "Help Center",
      "Contact Desk",
    ],
  },
  {
    title: "LEGAL",
    links: [
      "Privacy Policy",
      "Terms of Service",
      "Aviation Compliance",
      "Cookie Settings",
      "Security Protocol",
    ],
  },
];

const bottomLinks = ["Privacy", "Terms", "Security", "Sitemap"];

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] px-4 sm:px-6 lg:px-10 pt-14 pb-6 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10">
          <div className="lg:col-span-1">
            <h3 className="text-white text-xl font-extrabold mb-1">
              Cliqkar
            </h3>
            <p className="text-amber-300 text-[11px] font-semibold tracking-wide mb-4">
              STITCHED WITH GOOGLE
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Concierge-grade flight reservations, verified Ok-To-Board
              protocols, and streamlined diplomatic visas engineered for
              elite travelers and enterprise agencies.
            </p>
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-2 rounded-lg">
              <Cloud size={14} className="text-blue-400" />
              Google Cloud Tier Partner
            </span>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-white text-xs font-bold tracking-wide mb-4">
                {column.title}
              </p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-white text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © 2026 Cliqkar Technologies Inc. Stitched with Google. All
            rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {bottomLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-slate-500 hover:text-white text-xs transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}