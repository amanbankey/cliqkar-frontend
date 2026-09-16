 
import React, { useEffect, useRef } from "react";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const guides = [
  {
    image:
      "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=85",
    category: "UAE GUIDES",
    readTime: "5 MIN READ",
    title: "Dubai Tourist Visa Guide 2026: Rules, Costs &…",
    excerpt:
      "Everything you must know regarding 30-day vs 60-day permits, overstay fines, and mandatory health insurance protocols.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=85",
    category: "SCHENGEN 90-DAY",
    readTime: "8 MIN READ",
    title: "The Complete Schengen 90/180-Day Rule Handbook",
    excerpt:
      "How to accurately calculate your legal European stay across multiple trips without triggering an inadvertent Schengen overstay…",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&q=85",
    category: "UNITED KINGDOM",
    readTime: "6 MIN READ",
    title: "UK Standard Visitor Visa Breakdown: Avoid Refusals",
    excerpt:
      "Why 68% of initial UK visa refusals stem from unexplained fund deposits in bank statements and how to document financial ties legally.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501466044931-62695aada8e9?w=800&q=85",
    category: "USA CONSULAR",
    readTime: "10 MIN READ",
    title: "US B1/B2 Visa Interview: 15 Questions That Decide Your…",
    excerpt:
      "Actionable tips for demonstrating strong domestic ties under Section 214(b) during your 90-second consular officer interview.",
  },
];

const VisaGuides = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(cardsRef.current, {
        y: 70,
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      cardsRef.current.forEach((card) => {
        const image = card.querySelector(".guide-image");
        const content = card.querySelector(".guide-content");

        const enter = () => {
          gsap.to(card, {
            y: -8,
            duration: 0.35,
            ease: "power2.out",
          });

          gsap.to(image, {
            scale: 1.08,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(content, {
            y: -2,
            duration: 0.35,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(content, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        return () => {
          card.removeEventListener("mouseenter", enter);
          card.removeEventListener("mouseleave", leave);
        };
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-indigo-50/40 py-12 sm:py-14 md:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className="mb-8 flex flex-col gap-5 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] text-blue-600 sm:text-xs">
              <FiBookOpen size={14} />
              CONSULAR INTELLIGENCE DISPATCHES
            </p>

            <h2 className="mb-3 text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-[42px]">
              Visa Guides & Destination Advisories
            </h2>

            <p className="max-w-2xl text-xs leading-relaxed text-gray-500 sm:text-sm md:text-[15px]">
              Authoritative insights written by seasoned immigration
              specialists and consular attorneys.
            </p>
          </div>

          <button className="group flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800">
            <span>Explore All Guides</span>
            <FiArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {guides.map((guide, index) => (
            <article
              key={guide.title}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden sm:h-44 md:h-48 lg:h-44 xl:h-48">
                <img
                  src={guide.image}
                  alt={guide.title}
                  loading="lazy"
                  className="guide-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />

                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[9px] font-bold tracking-wide text-gray-700 backdrop-blur-sm">
                  {guide.category}
                </div>
              </div>

              <div className="guide-content p-4 sm:p-5">
                <div className="mb-2 flex flex-wrap items-center gap-1.5 text-[9px] font-bold tracking-wide text-gray-400 sm:text-[10px]">
                  <span>{guide.category}</span>
                  <span>·</span>
                  <span>{guide.readTime}</span>
                </div>

                <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-gray-900 sm:text-base">
                  {guide.title}
                </h3>

                <p className="line-clamp-3 text-[11px] leading-relaxed text-gray-500 sm:text-xs">
                  {guide.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Read Guide
                  <FiArrowRight size={12} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaGuides;
 
