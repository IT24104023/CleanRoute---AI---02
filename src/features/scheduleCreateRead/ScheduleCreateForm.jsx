import { useState } from "react";
import { PlusCircle, X } from "lucide-react";
import HierarchicalAreaSelect from "../../components/filters/HierarchicalAreaSelect";
import FormError from "../../components/common/FormError";
import SuccessMessage from "../../components/common/SuccessMessage";
import validateScheduleCreate from "./scheduleCreateValidation";

/**
 * ScheduleCreateForm – Member 1
 * Admin form to create a new collection schedule (district + sub-area).
 * Props:
 *   areas         {Array}    – area hierarchy from App state
 *   onAddSchedule {function} – called with new schedule object
 */
function ScheduleCreateForm({ areas, onAddSchedule }) {
  const emptyForm = {
    district: "",
    area: "",
    lastCollectedDate: "",
    nextCollectionDate: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleDistrictChange(district) {
    setForm((prev) => ({ ...prev, district, area: "" }));
    if (errors.district) setErrors((prev) => ({ ...prev, district: "" }));
    if (errors.area) setErrors((prev) => ({ ...prev, area: "" }));
  }

  function handleAreaChange(area) {
    setForm((prev) => ({ ...prev, area }));
    if (errors.area) setErrors((prev) => ({ ...prev, area: "" }));
  }

  function handleAddSchedule(e) {
    e.preventDefault();
    setSuccessMsg("");
    const validationErrors = validateScheduleCreate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAddSchedule({
      id: Date.now(),
      district: form.district,
      area: form.area,
      lastCollectedDate: form.lastCollectedDate,
      nextCollectionDate: form.nextCollectionDate,
    });
    setForm(emptyForm);
    setErrors({});
    setSuccessMsg("Schedule added successfully.");
  }

  function handleClear() {
    setForm(emptyForm);
    setErrors({});
    setSuccessMsg("");
  }

  return (
    <section aria-labelledby="create-schedule-heading">
      <div className="card">
        <h2
          id="create-schedule-heading"
          className="flex items-center gap-2 text-base font-bold text-gray-900 mb-5"
        >
          <PlusCircle className="w-5 h-5 text-green-600" aria-hidden="true" />
          Add New Schedule
        </h2>

        {successMsg && (
          <div className="mb-5">
            <SuccessMessage message={successMsg} />
          </div>
        )}

        <form onSubmit={handleAddSchedule} noValidate>
          <div className="space-y-4">
            {/* Hierarchical area */}
            <div>
              <label className="form-label">
                Area <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <HierarchicalAreaSelect
                areas={areas}
                district={form.district}
                area={form.area}
                onDistrictChange={handleDistrictChange}
                onAreaChange={handleAreaChange}
                required
                idPrefix="create-sched"
              />
              {errors.district && (
                <p role="alert" className="text-red-600 text-xs mt-1.5 flex items-center gap-1">
                  <span aria-hidden="true">⚠</span> {errors.district}
                </p>
              )}
              {errors.area && (
                <p role="alert" className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <span aria-hidden="true">⚠</span> {errors.area}
                </p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="create-last-date" className="form-label">
                  Last Collected Date <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="create-last-date"
                  type="date"
                  name="lastCollectedDate"
                  value={form.lastCollectedDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                {errors.lastCollectedDate && (
                  <p role="alert" className="text-red-600 text-xs mt-1.5">{errors.lastCollectedDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="create-next-date" className="form-label">
                  Next Collection Date <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="create-next-date"
                  type="date"
                  name="nextCollectionDate"
                  value={form.nextCollectionDate}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
                {errors.nextCollectionDate && (
                  <p role="alert" className="text-red-600 text-xs mt-1.5">{errors.nextCollectionDate}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Add Schedule
            </button>
            <button type="button" onClick={handleClear} className="btn-secondary">
              <X className="w-4 h-4" aria-hidden="true" />
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ScheduleCreateForm;
