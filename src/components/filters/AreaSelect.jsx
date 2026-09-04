/**
 * AreaSelect – shared dropdown for selecting a Sri Lankan area.
 * Props:
 *   value       {string}   – current selected value
 *   onChange    {function} – change handler
 *   includeAll  {boolean}  – prepend "All Areas" option (for filters)
 *   id          {string}   – id for label association
 *   name        {string}   – form field name
 *   required    {boolean}  – marks field as required
 */

const AREAS = ["Malabe", "Kaduwela", "Battaramulla", "Maharagama"];

function AreaSelect({ value, onChange, includeAll = false, id, name, required = false }) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="form-input"
      aria-required={required}
    >
      {includeAll ? (
        <option value="">All Areas</option>
      ) : (
        <option value="" disabled>
          Select an area
        </option>
      )}
      {AREAS.map((area) => (
        <option key={area} value={area}>
          {area}
        </option>
      ))}
    </select>
  );
}

export { AREAS };
export default AreaSelect;
