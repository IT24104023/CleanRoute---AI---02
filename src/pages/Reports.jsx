import PageHeader from "../components/common/PageHeader";
import ReportCreateForm from "../features/reportCreateRead/ReportCreateForm";
import ResidentReportList from "../features/reportCreateRead/ResidentReportList";

/**
 * Reports page – Resident view (create + read reports).
 * Features a modern two-column responsive workspace.
 * Props:
 *   reports        {Array}
 *   areas          {Array}    – area hierarchy
 *   onSubmitReport {function}
 */
function Reports({ reports, areas, onSubmitReport }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50/50">
      <PageHeader
        title="Missed Collection Reports"
        subtitle="Submit a missed collection notice or track ongoing community reports and official municipal responses."
        badge="Community Reporting"
      />
      <div className="section-container page-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Create form - 5 columns on desktop sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ReportCreateForm areas={areas} onSubmitReport={onSubmitReport} />
          </div>

          {/* Report list - 7 columns on desktop */}
          <div className="lg:col-span-7">
            <ResidentReportList reports={reports} areas={areas} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Reports;
