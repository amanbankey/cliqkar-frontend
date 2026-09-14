import { Cloud } from "lucide-react";
import { BsStars, BsTwitterX, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";
const columns = [
 
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

const footerLinks = {
    // Product: ["Features", "Pricing", "Use Cases", "Integrations", "API"],
    Company: ["Home", "Flight", "Visa", "Okay to board" , "About",     "Contact"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", ],
    Resources: ["Help Center", "Documentation", "Community", "Webinars", "Partners"],
  };

export default function Footer() {
  return (
    // <footer className="bg-[#0a1628] px-4 sm:px-6 lg:px-10 pt-14 pb-6  ">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10">
    //       <div className="lg:col-span-1">
    //         <h3 className="text-white text-xl font-extrabold mb-1">
    //           Cliqkar
    //         </h3>
          
    //         <p className="text-slate-400 text-sm leading-relaxed mb-5">
    //           Concierge-grade flight reservations, verified Ok-To-Board
    //           protocols, and streamlined diplomatic visas engineered for
    //           elite travelers and enterprise agencies.
    //         </p>
           
    //       </div>

    //       {columns.map((column) => (
    //         <div key={column.title}>
    //           <p className="text-white text-xs font-bold tracking-wide mb-4">
    //             {column.title}
    //           </p>
    //           <ul className="space-y-3">
    //             {column.links.map((link) => (
    //               <li key={link}>
    //                 <a
    //                   href="#"
    //                   className="text-slate-400 hover:text-white text-sm transition-colors"
    //                 >
    //                   {link}
    //                 </a>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       ))}
    //     </div>

    //     <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
    //       <p className="text-slate-500 text-xs text-center sm:text-left">
    //         © 2026 Cliqkar Technologies Inc. All
    //         rights reserved.
    //       </p>
    //       <div className="flex items-center gap-5">
    //         {bottomLinks.map((link) => (
    //           <a
    //             key={link}
    //             href="#"
    //             className="text-slate-500 hover:text-white text-xs transition-colors"
    //           >
    //             {link}
    //           </a>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </footer>

        <footer className=" bg-[#0a1628] text-gray-400 px-4  pt-12 pb-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-around gap-8 mb-10 px-5 sm:px-2">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="text-white font-bold text-sm mb-2">
              Cliqkar<sup className="text-xs">™</sup>
            </h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              AI-Powered Trade & Logistics Intelligence Platform
            </p>
            <div className="flex items-center gap-3">
              {[BsTwitterX, BsLinkedin, BsFacebook, BsInstagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon size={13} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
         
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
 
        {/* <div className="border-t border-gray-700 pt-5 flex flex-col sm:flex-row max-w-7xl w-full items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
             All rights reserved
          </p>
          <div className="flex items-center gap-4">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a key={item} href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div> */}
        <div className="flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © 2026 Cliqkar Technologies Inc. All
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