import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";
import HierarchicalAreaSelect from "../../components/filters/HierarchicalAreaSelect";
import FormError from "../../components/common/FormError";
import validateScheduleUpdate from "./scheduleUpdateValidation";

/**
 * EditScheduleModal – Member 2
 * Modal for editing an existing collection schedule.
 * Props:
 *   schedule  {object|null} – schedule being edited (null = closed)
 *   areas     {Array}       – area hierarchy
 *   onSave    {function}    – called with updated schedule
 *   onCancel  {function}    – closes modal
 */
function EditScheduleModal({ schedule, areas, onSave, onCancel }) {
  const [form, setForm] = useState({
    district: "",
    area: "",
    lastCollectedDate: "",
    nextCollectionDate: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (schedule) {
      setForm({
        district: schedule.district || "",
        area: schedule.area || "",
        lastCollectedDate: schedule.lastCollectedDate,
        nextCollectionDate: schedule.nextCollectionDate,
      });
      setErrors({});
    }
  }, [schedule]);

  if (!schedule) return null;

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

  function handleSave(e) {
    e.preventDefault();
    const validationErrors = validateScheduleUpdate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ ...schedule, ...form });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-schedule-title"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 id="edit-schedule-title" className="text-base font-bold text-gray-900">
            Edit Schedule
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="btn-ghost p-1.5"
            aria-label="Close"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} noValidate className="p-6 space-y-4">
          {/* Area */}
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
              idPrefix="edit-sched"
            />
            {errors.district && <FormError message={errors.district} />}
            {errors.area && <FormError message={errors.area} />}
          </div>

          {/* Last collected date */}
          <div>
            <label htmlFor="edit-last-date" className="form-label">
              Last Collected Date <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="edit-last-date"
              type="date"
              name="lastCollectedDate"
              value={form.lastCollectedDate}
              onChange={handleChange}
              className="form-input"
              required
            />
            <FormError message={errors.lastCollectedDate} />
          </div>

          {/* Next collection date */}
          <div>
            <label htmlFor="edit-next-date" className="form-label">
              Next Collection Date <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="edit-next-date"
              type="date"
              name="nextCollectionDate"
              value={form.nextCollectionDate}
              onChange={handleChange}
              className="form-input"
              required
            />
            <FormError message={errors.nextCollectionDate} />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save className="w-4 h-4" aria-hidden="true" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditScheduleModal;
