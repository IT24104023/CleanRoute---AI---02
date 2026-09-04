import { useState } from "react";
import { MapPin } from "lucide-react";
import HierarchicalAreaSelect from "../../components/filters/HierarchicalAreaSelect";
import ScheduleCard from "./ScheduleCard";
import EmptyState from "../../components/common/EmptyState";
import { getScheduleByArea } from "./scheduleAreaFilter";

/**
 * ResidentScheduleView – Member 1
 * Two-step area selection (district → sub-area) then display the schedule.
 * Center-aligned layout for neat presentation.
 * Props:
 *   schedules {Array} – all schedule objects
 *   areas     {Array} – area hierarchy
 */
function ResidentScheduleView({ schedules, areas }) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const schedule = getScheduleByArea(schedules, selectedArea);

  function handleDistrictChange(district) {
    setSelectedDistrict(district);
    setSelectedArea(""); // reset sub-area
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Area selector card */}
      <div className="card mb-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-green-100 rounded-lg p-1.5">
            <MapPin className="w-4 h-4 text-green-600" aria-hidden="true" />
          </div>
          <label className="text-base font-bold text-gray-800">
            Select Your Area
          </label>
        </div>
        <p className="text-sm text-gray-400 mb-4 ml-8">
          Choose your district, then your specific sub-area.
        </p>

        <HierarchicalAreaSelect
          areas={areas}
          district={selectedDistrict}
          area={selectedArea}
          onDistrictChange={handleDistrictChange}
          onAreaChange={setSelectedArea}
          idPrefix="resident-schedule"
        />
      </div>

      {/* Results */}
      {!selectedDistrict && (
        <EmptyState
          message="Select your district above to get started."
          icon={<MapPin className="w-12 h-12 text-gray-200" aria-hidden="true" />}
        />
      )}

      {selectedDistrict && !selectedArea && (
        <EmptyState
          message={`Now select a sub-area within ${selectedDistrict}.`}
          icon={<MapPin className="w-12 h-12 text-gray-200" aria-hidden="true" />}
        />
      )}

      {selectedArea && !schedule && (
        <EmptyState message="No collection schedule is currently available for this area." />
      )}

      {selectedArea && schedule && <ScheduleCard schedule={schedule} />}
    </div>
  );
}

export default ResidentScheduleView;
