import PageHeader from "../components/common/PageHeader";
import ResidentScheduleView from "../features/scheduleCreateRead/ResidentScheduleView";

/**
 * Schedule page – Resident view.
 * Props:
 *   schedules {Array}
 *   areas     {Array} – area hierarchy
 */
function Schedule({ schedules, areas }) {
  return (
    <main>
      <PageHeader
        title="Collection Schedule"
        subtitle="Select your district and sub-area to view the latest waste collection information."
        badge="Sample / Prototype Data"
      />
      <div className="section-container page-section">
        <ResidentScheduleView schedules={schedules} areas={areas} />
      </div>
    </main>
  );
}

export default Schedule;
