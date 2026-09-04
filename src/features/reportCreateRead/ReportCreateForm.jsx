import { useState } from "react";
import { Send, Phone, MapPin, Calendar, FileText, ShieldAlert } from "lucide-react";
import HierarchicalAreaSelect from "../../components/filters/HierarchicalAreaSelect";
import FormError from "../../components/common/FormError";
import SuccessMessage from "../../components/common/SuccessMessage";
import validateReportCreate from "./reportCreateValidation";

/**
 * ReportCreateForm – Member 3
 * Resident form for submitting a missed collection report.
 * Clean, modern, accessible design with clear indicators.
 * Phone is optional and strictly designated as visible only to admins.
 */
function ReportCreateForm({ areas, onSubmitReport }) {
  const emptyForm = {
    district: "",
    area: "",
    collectionDate: "",
    description: "",
    phone: "",
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

  function handleSubmitReport(e) {
    e.preventDefault();
    setSuccessMsg("");
    const validationErrors = validateReportCreate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newReport = {
      id: Date.now(),
      district: form.district,
      area: form.area,
      collectionDate: form.collectionDate,
      description: form.description.trim(),
      phone: form.phone.trim(),
      status: "Pending",
      adminComment: "",
    };
    onSubmitReport(newReport);
    setForm(emptyForm);
    setErrors({});
    setSuccessMsg("Your report has been submitted. The administrative team will review and update status soon.");
  }

  return (
    <section aria-labelledby="report-form-heading">
      <div className="card shadow-sm border border-gray-100 bg-white">
        <div className="border-b border-gray-100 pb-4 mb-5">
          <h2 id="report-form-heading" className="text-lg font-bold text-gray-900 tracking-tight">
            Report a Missed Collection
          </h2>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Fill out the details below. Submitted reports appear on the public feed and will be tracked by prototype administrators.
          </p>
        </div>

        {successMsg && (
          <div className="mb-5">
            <SuccessMessage message={successMsg} />
          </div>
        )}

        <form onSubmit={handleSubmitReport} noValidate className="space-y-4">
          {/* Location Hierarchical Area */}
          <div>
            <label className="form-label flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
                Select Location
                <span className="text-red-500" aria-hidden="true">*</span>
              </span>
              <span className="text-[11px] font-normal text-gray-400">District &amp; Sub-Area</span>
            </label>
            <HierarchicalAreaSelect
              areas={areas}
              district={form.district}
              area={form.area}
              onDistrictChange={handleDistrictChange}
              onAreaChange={handleAreaChange}
              required
              idPrefix="report-create"
            />
            {errors.district && <FormError message={errors.district} />}
            {errors.area && <FormError message={errors.area} />}
          </div>

          {/* Collection Date */}
          <div>
            <label htmlFor="report-date" className="form-label flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
              Expected Collection Date
              <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id="report-date"
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
            <label htmlFor="report-description" className="form-label flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
              Issue Description
              <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <textarea
              id="report-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Garbage truck bypassed our lane or missed morning collection..."
              className="form-input resize-none"
              required
            />
            <FormError message={errors.description} />
          </div>

          {/* Contact Number (Admin-only) */}
          <div className="bg-amber-50/50 rounded-xl p-3.5 border border-amber-200/60 space-y-1.5">
            <label htmlFor="report-phone" className="form-label mb-0 flex items-center justify-between text-gray-800">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                Contact Phone
                <span className="text-xs font-normal text-gray-500">(optional)</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100/90 text-amber-900 border border-amber-200">
                <ShieldAlert className="w-3 h-3 text-amber-600" aria-hidden="true" />
                Admin-Only
              </span>
            </label>
            <input
              id="report-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 077 123 4567"
              className="form-input bg-white"
            />
            <p className="text-[11px] text-amber-800/80 leading-normal">
              Your contact number is never published on the public reports feed; it is only visible to municipal administrators if follow-up is needed.
            </p>
            <FormError message={errors.phone} />
          </div>

          {/* Submission Notice */}
          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              Submit Missed Collection Report
            </button>
            <p className="text-[11px] text-center text-gray-400 mt-2">
              Status will initialize as <span className="font-semibold text-amber-600">Pending</span>. Residents cannot modify reports once submitted.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ReportCreateForm;
