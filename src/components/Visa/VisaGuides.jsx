import React from "react";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";

const guides = [
  {
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80",
    category: "UAE GUIDES",
    readTime: "5 MIN READ",
    title: "Dubai Tourist Visa Guide 2026: Rules, Costs &…",
    excerpt: "Everything you must know regarding 30-day vs 60-day permits, overstay fines, and mandatory health insurance protocols.",
  },
  {
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80",
    category: "SCHENGEN 90-DAY",
    readTime: "8 MIN READ",
    title: "The Complete Schengen 90/180-Day Rule Handbook",
    excerpt: "How to accurately calculate your legal European stay across multiple trips without triggering an inadvertent Schengen overstay…",
  },
  {
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=600&q=80",
    category: "UNITED KINGDOM",
    readTime: "6 MIN READ",
    title: "UK Standard Visitor Visa Breakdown: Avoid Refusals",
    excerpt: "Why 68% of initial UK visa refusals stem from unexplained fund deposits in bank statements and how to document financial ties legally.",
  },
  {
    image: "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=600&q=80",
    category: "USA CONSULAR",
    readTime: "10 MIN READ",
    title: "US B1/B2 Visa Interview: 15 Questions That Decide Your…",
    excerpt: "Actionable tips for demonstrating strong domestic ties under Section 214(b) during your 90-second consular officer interview.",
  },
];

const VisaGuides = () => {
  return (
    <section className="bg-indigo-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="flex items-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
              <FiBookOpen size={14} /> CONSULAR INTELLIGENCE DISPATCHES
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Visa Guides &amp; Destination Advisories</h2>
            <p className="text-gray-500 text-sm">Authoritative insights written by seasoned immigration specialists and consular attorneys.</p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline flex-shrink-0">
            Explore All Guides <FiArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {guides.map((guide) => (
            <div key={guide.title} className="bg-white rounded-2xl overflow-hidden">
              <img src={guide.image} alt={guide.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-wide text-gray-400 mb-2">
                  {guide.category} &middot; {guide.readTime}
                </p>
                <p className="text-base font-bold text-gray-900 leading-snug mb-2">{guide.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{guide.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaGuides;