import { ChevronDown } from "lucide-react";

/**
 * AreaFilterSelect – Single <select> with <optgroup> for filter dropdowns.
 * Shows "All Areas" + districts as group labels + sub-areas as options.
 *
 * Props:
 *   areas    {Array}    – area hierarchy from App state
 *   value    {string}   – current filter value (sub-area name or "")
 *   onChange {function} – standard onChange handler
 *   id       {string}
 *   name     {string}
 */
function AreaFilterSelect({ areas, value, onChange, id, name }) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-input pr-9 appearance-none cursor-pointer"
        aria-label="Filter by area"
      >
        <option value="">All Areas</option>
        {areas.map((d) => (
          <optgroup key={d.id} label={d.district}>
            {d.subAreas.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        aria-hidden="true"
      />
    </div>
  );
}

export default AreaFilterSelect;
