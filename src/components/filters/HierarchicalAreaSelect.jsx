import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * HierarchicalAreaSelect – Two-step form selector.
 * Step 1: Select District
 * Step 2: Select Sub-area within that district
 *
 * Fully controlled: parent manages both district and area state.
 *
 * Props:
 *   areas            {Array}    – area hierarchy from App state
 *   district         {string}   – currently selected district
 *   area             {string}   – currently selected sub-area name
 *   onDistrictChange {function} – called with district name string
 *   onAreaChange     {function} – called with sub-area name string
 *   required         {boolean}
 *   idPrefix         {string}   – prefix for input ids (for label association)
 */
function HierarchicalAreaSelect({
  areas,
  district,
  area,
  onDistrictChange,
  onAreaChange,
  required = false,
  idPrefix = "area",
}) {
  const subAreas =
    areas.find((d) => d.district === district)?.subAreas ?? [];

  function handleDistrictChange(e) {
    onDistrictChange(e.target.value);
    onAreaChange(""); // reset sub-area when district changes
  }

  return (
    <div className="space-y-2">
      {/* District selector */}
      <div className="relative">
        <select
          id={`${idPrefix}-district`}
          value={district}
          onChange={handleDistrictChange}
          className="form-input pr-9 appearance-none cursor-pointer"
          aria-label="Select district"
        >
          <option value="" disabled>
            Select district…
          </option>
          {areas.map((d) => (
            <option key={d.id} value={d.district}>
              {d.district}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          aria-hidden="true"
        />
      </div>

      {/* Sub-area selector – only visible once district is chosen */}
      {district && (
        <div className="relative">
          <select
            id={`${idPrefix}-subarea`}
            value={area}
            onChange={(e) => onAreaChange(e.target.value)}
            className="form-input pr-9 appearance-none cursor-pointer"
            required={required}
            aria-required={required}
            aria-label={`Select sub-area in ${district}`}
          >
            <option value="" disabled>
              Select sub-area in {district}…
            </option>
            {subAreas.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}

export default HierarchicalAreaSelect;
