import React, { useEffect, useRef, useState } from "react";
import { FiCreditCard, FiSliders, FiAward, FiSmartphone, FiBell, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: FiCreditCard,
    title: "Transparent Pricing",
    description: "Zero hidden embassy markups, sudden courier surcharges, or opaque processing fees. You see the complete, itemized cost before you apply.",
  },
  {
    icon: FiSliders,
    title: "Personalized Requirements",
    description: "Dynamic document engines only request what your exact nationality and passport configuration requires. No surplus paperwork.",
  },
  {
    icon: FiAward,
    title: "Expert Consular Review",
    description: "Every dossier is cross-referenced by former consular visa processing agents to correct discrepancies before embassy filing.",
  },
  
];

// Lightweight scroll-reveal hook — no external animation library required.
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect users who prefer reduced motion — show content immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
};

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
      className={`group relative bg-white rounded-2xl p-6 border border-slate-900/5 shadow-sm
        transition-all duration-700 ease-out
        hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-900/10 hover:border-slate-900/10
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Icon */}
      <span
        className="relative w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-5
          transition-all duration-300 ease-out
          group-hover:bg-slate-900 group-hover:scale-110 group-hover:rotate-3
          group-hover:shadow-lg group-hover:shadow-slate-900/25"
      >
        <Icon
          className="text-blue-600 transition-colors duration-300 group-hover:text-white"
          size={18}
        />
      </span>

      <p className="text-lg font-bold text-gray-900 mb-2">{title}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>

      {/* Accent underline that grows in on hover */}
      <span
        className="absolute bottom-0 left-6 right-6 h-px bg-slate-900/20 origin-left scale-x-0
          transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </div>
  );
};

const WhyChooseUs = () => {
  const [headerRef, headerInView] = useInView();

  return (
    <section className="relative bg-indigo-50/40 py-16 overflow-hidden">
      {/* Subtle floating background accents — kept quiet, not decorative noise */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-indigo-100/50 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-slate-200/40 blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out ${
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="flex items-center justify-center gap-2 text-xs font-bold tracking-wide text-blue-600 mb-2">
            ✪ ENGINEERED FOR RADICAL CLARITY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
            Why Modern Travelers Choose CLIQKAR
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-10">
            Replacing bureaucratic confusion with modern software efficiency and institutional consular rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} index={index} {...feature} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(12px, -18px) scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[float_10s_ease-in-out_infinite\\],
          .animate-\\[float_12s_ease-in-out_infinite_reverse\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;