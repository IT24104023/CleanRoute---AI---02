import { useState, useEffect } from "react";
import { Save, X, Phone } from "lucide-react";
import HierarchicalAreaSelect from "../../components/filters/HierarchicalAreaSelect";
import FormError from "../../components/common/FormError";
import validateReportUpdate from "./reportUpdateValidation";

/**
 * EditReportModal – Member 4
 * Admin-only edit modal (admin can edit all fields including status and adminComment).
 * Props:
 *   report    {object|null} – report being edited (null = closed)
 *   areas     {Array}       – area hierarchy
 *   onSave    {function}    – called with updated report
 *   onCancel  {function}    – closes modal
 */
function EditReportModal({ report, areas, onSave, onCancel }) {
  const [form, setForm] = useState({
    district: "",
    area: "",
    collectionDate: "",
    description: "",
    phone: "",
    status: "Pending",
    adminComment: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (report) {
      setForm({
        district: report.district || "",
        area: report.area || "",
        collectionDate: report.collectionDate,
        description: report.description,
        phone: report.phone || "",
        status: report.status,
        adminComment: report.adminComment || "",
      });
      setErrors({});
    }
  }, [report]);

  if (!report) return null;

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
    const validationErrors = validateReportUpdate(form, true);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ ...report, ...form });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-report-title"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h2 id="edit-report-title" className="text-base font-bold text-gray-900">
              Edit Report
            </h2>
            <p className="text-xs text-amber-600 mt-0.5">Admin access</p>
          </div>
          <button type="button" onClick={onCancel} className="btn-ghost p-1.5" aria-label="Close">
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
              idPrefix="edit-report"
            />
            {errors.district && <FormError message={errors.district} />}
            {errors.area && <FormError message={errors.area} />}
          </div>

          {/* Collection Date */}
          <div>
            <label htmlFor="edit-r-date" className="form-label">
              Collection Date <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="edit-r-date"
              type="date"
              name="collectionDate"
              value={form.collectionDate}
              onChange={handleChange}
              className="form-input"
              required
            />
            <FormError message={errors.collectionDate} />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="edit-r-desc" className="form-label">
              Description <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="edit-r-desc"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="form-input resize-none"
              required
            />
            <FormError message={errors.description} />
          </div>

          {/* Phone – admin can see and edit */}
          <div>
            <label htmlFor="edit-r-phone" className="form-label">
              <Phone className="inline w-3.5 h-3.5 mr-1 text-gray-400" aria-hidden="true" />
              Contact Number
              <span className="ml-1.5 tag bg-amber-50 text-amber-600 text-[10px]">Admin only</span>
            </label>
            <input
              id="edit-r-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Resident's phone number"
              className="form-input"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="edit-r-status" className="form-label">
              Status <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <select
              id="edit-r-status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-input cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="Resolved">Resolved</option>
            </select>
            <FormError message={errors.status} />
          </div>

          {/* Admin Comment */}
          <div>
            <label htmlFor="edit-r-comment" className="form-label">
              Admin Comment
              <span className="ml-1.5 tag bg-amber-50 text-amber-600 text-[10px]">Admin only</span>
            </label>
            <textarea
              id="edit-r-comment"
              name="adminComment"
              value={form.adminComment}
              onChange={handleChange}
              rows={3}
              placeholder="Add a response or internal note for this report…"
              className="form-input resize-none"
            />
            <p className="form-hint">
              Visible only to admin. Use this for internal notes or resident response.
            </p>
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

export default EditReportModal;
