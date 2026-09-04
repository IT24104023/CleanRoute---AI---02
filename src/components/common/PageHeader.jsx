/**
 * PageHeader – reusable page title + subtitle banner.
 * Modern, clean public-service design with soft green accent.
 * Center-aligned for visual balance.
 * Props:
 *   title      {string} – main heading
 *   subtitle   {string} – supporting text (optional)
 *   badge      {string} – small label above title (optional)
 */
function PageHeader({ title, subtitle, badge }) {
  return (
    <div className="bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="section-container py-8 sm:py-10 text-center flex flex-col items-center">
        {badge && (
          <div className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200/70 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" aria-hidden="true" />
              {badge}
            </span>
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-2xl leading-relaxed text-center">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
