import { Cloud } from "lucide-react";
import { BsStars, BsTwitterX, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/image/cliqkarLogo.png"
import { Phone , Mail , MapPin} from 'lucide-react';
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
    Company: [
    { name: "Home", path: "/" },
    { name: "Flight", path: "/flight" },
    { name: "Visa", path: "/visa" },
    { name: "Okay to board", path: "/okay-to-board" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", ],
    Resources: [  "Documentation", "Community", "Webinars", "Partners"],
  };

export default function Footer() {
  return (
    

        <footer className=" bg-[#0a1628] text-gray-400 px-4  pt-12 pb-6">
      <div className="max-w-7xl mx-auto " >
        <div className="flex flex-col md:flex-row items-start justify-around gap-8 mb-10 px-5 sm:px-2">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
           <NavLink to="/" className="flex-shrink-0 text-white duration-200">
            <img src={logo} className="object-contain w-36" />
          </NavLink>
            
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
            <h4 className="mb-4 text-sm font-semibold text-white">{heading}</h4>

            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={typeof link === "string" ? link : link.name}>
                  {typeof link === "string" ? (
                    <a
                      href="#"
                      className="text-xs text-gray-400 transition-colors hover:text-white hover:underline" 
                    >
                      {link}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-xs text-gray-400 transition-colors hover:text-white hover:underline"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:max-w-[240px] sm:max-w-[200px] max-w-[170px] shrink-0">
          <h4 className="mb-4 text-sm font-semibold text-white">Contact Us</h4>

          <ul className="space-y-3.5">
            <li className="flex items-start gap-2.5">
              <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />
              <span className="text-xs leading-relaxed text-gray-400">
                J.G Height 2nd Floor Vivan travel. Opp. K.G Plaza, Vaisali
                Nagar, Ajmar.
              </span>
            </li>

            <li className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-gray-400" />
              <span className="text-xs text-gray-400">+91 8764232996</span>
            </li>

            <li className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-gray-400" />
              <span className="text-xs text-gray-400">
                mail@vivantravels.com
              </span>
            </li>
          </ul>
        </div>
        </div>
        
       

        <div className="flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-slate-500 text-xs text-center sm:text-left">
            © 2026 Cliqkar Technologies Inc. All
            rights reserved.
          </p>
           
          <p className="text-xs text-slate-500 ">
              <a href="https://technoviaan.com/" target="_blank" rel="noreferrer">
                <button className="hover:underline"> Designed and Developed by Technoviaan Software Solutions</button>
              </a>
         
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