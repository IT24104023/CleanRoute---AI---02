import { Link } from "react-router-dom";
import {
  CalendarDays,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Leaf,
  MapPin,
  FileText,
  ArrowRight,
} from "lucide-react";

/**
 * Home – Landing page.
 * Center-aligned, modern, clean, and balanced public-service design.
 */
function Home() {
  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="bg-green-700 text-white"
        aria-labelledby="hero-heading"
      >
        <div className="section-container py-20 sm:py-28 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Top Prototype Badge */}
            <div className="inline-flex items-center gap-2 bg-green-600 text-green-100 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 border border-green-500 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-green-300" aria-hidden="true" />
              <span>Sample / Prototype — Not official government data</span>
            </div>

            {/* Brand Heading */}
            <h1
              id="hero-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white"
            >
              Clean<span className="text-green-300">Route</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-xl sm:text-2xl text-green-100 font-medium max-w-xl mx-auto leading-snug">
              Waste Collection Schedule &amp; Reporting System
            </p>

            {/* Supporting Description */}
            <p className="mt-4 text-base sm:text-lg text-green-200 max-w-xl mx-auto leading-relaxed">
              Know your collection dates. Report missed collections. One simple place for Sri Lankan residents.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
              <Link
                to="/schedule"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-green-800 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl hover:bg-green-50 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700"
              >
                <CalendarDays className="w-4 h-4 text-green-700" aria-hidden="true" />
                <span>View Collection Schedule</span>
                <ChevronRight className="w-4 h-4 text-green-700" aria-hidden="true" />
              </Link>
              <Link
                to="/reports"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-800/80 hover:bg-green-800 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl border border-green-500/80 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700"
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>Report Missed Collection</span>
                <ChevronRight className="w-4 h-4 text-white" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ───────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100" aria-labelledby="problem-heading">
        <div className="section-container py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-extrabold text-red-600 tracking-widest uppercase mb-3 bg-red-50 border border-red-200/60 px-3 py-1 rounded-full">
              The Problem
            </span>
            <h2 id="problem-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Residents lack clear waste collection information
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-10 max-w-2xl mx-auto">
              Sri Lankan residents and households need a simple way to know{" "}
              <strong className="text-gray-900">when waste was last collected</strong> in
              their area, <strong className="text-gray-900">when the next collection is expected</strong>,
              and <strong className="text-gray-900">how to report a missed collection</strong>.
              Without a clear source of information, residents are left uncertain and waste can accumulate with no easy way to raise concerns.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
              {[
                {
                  color: "border-t-4 border-red-400 bg-red-50/60",
                  icon: <CalendarDays className="w-5 h-5 text-red-600" aria-hidden="true" />,
                  title: "Missed Last Dates",
                  text: "No reliable way to check when the last municipal collection took place.",
                },
                {
                  color: "border-t-4 border-orange-400 bg-orange-50/60",
                  icon: <AlertTriangle className="w-5 h-5 text-orange-600" aria-hidden="true" />,
                  title: "Uncertain Schedules",
                  text: "Uncertainty about when the upcoming collection vehicle will arrive.",
                },
                {
                  color: "border-t-4 border-yellow-400 bg-yellow-50/60",
                  icon: <FileText className="w-5 h-5 text-yellow-600" aria-hidden="true" />,
                  title: "No Reporting Loop",
                  text: "No simple channel to report a missed or skipped collection and receive updates.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col p-5 rounded-2xl border border-gray-100 shadow-sm ${item.color}`}
                >
                  <div className="bg-white rounded-xl p-2.5 w-fit shadow-xs mb-3 border border-gray-100">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CLEANROUTE HELPS ──────────────────────────────────── */}
      <section className="bg-gray-50/80" aria-labelledby="why-heading">
        <div className="section-container py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-extrabold text-green-700 tracking-widest uppercase mb-3 bg-green-100/80 border border-green-200 px-3 py-1 rounded-full">
              Why CleanRoute Helps
            </span>
            <h2 id="why-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              One simple place for residents
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-10 max-w-2xl mx-auto">
              CleanRoute gives residents one simple place to check collection dates and report
              missed collections, reducing uncertainty around local waste collection services.
              All schedules shown are sample / prototype data and do not represent official government or council information.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                {
                  icon: <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />,
                  title: "Check your schedule",
                  text: "View last and next collection dates for your specific sub-area.",
                },
                {
                  icon: <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />,
                  title: "Report a missed collection",
                  text: "Submit a short report if your collection was skipped.",
                },
                {
                  icon: <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />,
                  title: "Track your report",
                  text: "See whether your report is Pending or has been Resolved with admin comments.",
                },
                {
                  icon: <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />,
                  title: "Admin management",
                  text: "Admins manage schedules, reports, and sub-district area data.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-gray-200 transition-colors"
                >
                  <div className="mt-0.5 bg-green-50 rounded-xl p-2 border border-green-100">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="bg-white" aria-labelledby="how-heading">
        <div className="section-container py-16 sm:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-extrabold text-blue-700 tracking-widest uppercase mb-3 bg-blue-50 border border-blue-200/70 px-3 py-1 rounded-full">
              How It Works
            </span>
            <h2 id="how-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Three simple steps
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-md mx-auto">
              Access waste collection schedules and log reports with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                n: "01",
                icon: <MapPin className="w-6 h-6 text-green-600" aria-hidden="true" />,
                title: "Select your area",
                text: "Choose your district, then select your specific sub-area from the Schedule page.",
              },
              {
                n: "02",
                icon: <CalendarDays className="w-6 h-6 text-green-600" aria-hidden="true" />,
                title: "Check collection dates",
                text: "View the last collected date and the next scheduled collection for your area.",
              },
              {
                n: "03",
                icon: <FileText className="w-6 h-6 text-green-600" aria-hidden="true" />,
                title: "Report if missed",
                text: "If collection was skipped, submit a quick report so it can be tracked and resolved.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="relative bg-gray-50/80 rounded-2xl p-6 border border-gray-100 flex flex-col items-center text-center shadow-xs hover:shadow-sm transition-all"
              >
                <div className="absolute -top-3.5 bg-green-600 text-white text-xs font-extrabold w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                  {item.n}
                </div>
                <div className="bg-green-100/80 rounded-2xl p-3.5 mb-4 mt-2">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Centered Bottom CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/schedule" className="w-full sm:w-auto btn-primary px-7 py-3 text-sm">
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              <span>View Schedule</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link to="/reports" className="w-full sm:w-auto btn-outline-green px-7 py-3 text-sm">
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Report a Missed Collection</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
