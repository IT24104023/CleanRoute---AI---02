import { useState } from "react";
import { Plus, Trash2, MapPin, ChevronDown, ChevronRight } from "lucide-react";
import FormError from "../../components/common/FormError";
import SuccessMessage from "../../components/common/SuccessMessage";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

/**
 * AdminAreaManager – Area management panel for the admin.
 * Admins can add new districts and sub-areas, and delete existing ones.
 * Changes update the shared areas state in App.jsx.
 *
 * Props:
 *   areas           {Array}    – area hierarchy
 *   onAddDistrict   {function} – (districtName) => void
 *   onAddSubArea    {function} – (districtId, subAreaName) => void
 *   onDeleteDistrict{function} – (districtId) => void
 *   onDeleteSubArea {function} – (districtId, subAreaId) => void
 */
function AdminAreaManager({
  areas,
  onAddDistrict,
  onAddSubArea,
  onDeleteDistrict,
  onDeleteSubArea,
}) {
  // New district form
  const [newDistrict, setNewDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");

  // New sub-area form per district
  const [newSubArea, setNewSubArea] = useState({}); // { [districtId]: string }
  const [subAreaErrors, setSubAreaErrors] = useState({}); // { [districtId]: string }

  // Expanded districts
  const [expanded, setExpanded] = useState({});

  // Delete confirmations
  const [deleteDistrict, setDeleteDistrict] = useState(null);
  const [deleteSubArea, setDeleteSubArea] = useState(null); // { district, subArea }

  const [successMsg, setSuccessMsg] = useState("");

  // ── District handlers ──────────────────────────────────
  function handleAddDistrict(e) {
    e.preventDefault();
    const name = newDistrict.trim();
    if (!name) {
      setDistrictError("Please enter a district name.");
      return;
    }
    if (areas.some((d) => d.district.toLowerCase() === name.toLowerCase())) {
      setDistrictError("A district with this name already exists.");
      return;
    }
    onAddDistrict(name);
    setNewDistrict("");
    setDistrictError("");
    setSuccessMsg(`District "${name}" added successfully.`);
  }

  // ── Sub-area handlers ──────────────────────────────────
  function handleAddSubArea(e, district) {
    e.preventDefault();
    const name = (newSubArea[district.id] || "").trim();
    if (!name) {
      setSubAreaErrors((prev) => ({ ...prev, [district.id]: "Please enter a sub-area name." }));
      return;
    }
    if (district.subAreas.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      setSubAreaErrors((prev) => ({ ...prev, [district.id]: "This sub-area already exists." }));
      return;
    }
    onAddSubArea(district.id, name);
    setNewSubArea((prev) => ({ ...prev, [district.id]: "" }));
    setSubAreaErrors((prev) => ({ ...prev, [district.id]: "" }));
    setSuccessMsg(`Sub-area "${name}" added to ${district.district}.`);
  }

  function toggleExpanded(id) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section aria-labelledby="area-mgmt-heading">
      <div className="space-y-6">
        {successMsg && (
          <SuccessMessage message={successMsg} />
        )}

        {/* Add district form */}
        <div className="card">
          <h2 id="area-mgmt-heading" className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4">
            <Plus className="w-5 h-5 text-green-600" aria-hidden="true" />
            Add New District
          </h2>
          <form onSubmit={handleAddDistrict} noValidate>
            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <label htmlFor="new-district-input" className="form-label">
                  District Name
                </label>
                <input
                  id="new-district-input"
                  type="text"
                  value={newDistrict}
                  onChange={(e) => {
                    setNewDistrict(e.target.value);
                    if (districtError) setDistrictError("");
                  }}
                  placeholder="e.g. Nugegoda"
                  className="form-input"
                />
                <FormError message={districtError} />
              </div>
              <div className="pt-6">
                <button type="submit" className="btn-primary">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* District list */}
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            Districts &amp; Sub-areas
          </h3>
          {areas.length === 0 ? (
            <p className="text-sm text-gray-400">No districts yet. Add one above.</p>
          ) : (
            <div className="space-y-2">
              {areas.map((district) => (
                <div key={district.id} className="card-flat border border-gray-100 overflow-hidden">
                  {/* District header */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleExpanded(district.id)}
                      className="flex items-center gap-2 flex-1 text-left py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-lg"
                      aria-expanded={!!expanded[district.id]}
                    >
                      <div className="bg-green-100 rounded-lg p-1.5">
                        <MapPin className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
                      </div>
                      <span className="font-bold text-gray-900">{district.district}</span>
                      <span className="tag bg-gray-100 text-gray-500 ml-1">
                        {district.subAreas.length} sub-area{district.subAreas.length !== 1 ? "s" : ""}
                      </span>
                      {expanded[district.id] ? (
                        <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" aria-hidden="true" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteDistrict(district)}
                      className="ml-2 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      aria-label={`Delete district ${district.district}`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Expanded content */}
                  {expanded[district.id] && (
                    <div className="mt-3 ml-8 space-y-3">
                      {/* Sub-areas list */}
                      {district.subAreas.length === 0 ? (
                        <p className="text-xs text-gray-400">No sub-areas yet.</p>
                      ) : (
                        <ul className="space-y-1.5" role="list">
                          {district.subAreas.map((sub) => (
                            <li
                              key={sub.id}
                              className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2"
                            >
                              <span className="text-sm text-gray-700">{sub.name}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteSubArea({ district, subArea: sub })
                                }
                                className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                                aria-label={`Delete sub-area ${sub.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Add sub-area form */}
                      <form
                        onSubmit={(e) => handleAddSubArea(e, district)}
                        noValidate
                        className="flex gap-2 items-start"
                      >
                        <div className="flex-1">
                          <input
                            type="text"
                            value={newSubArea[district.id] || ""}
                            onChange={(e) => {
                              setNewSubArea((prev) => ({
                                ...prev,
                                [district.id]: e.target.value,
                              }));
                              if (subAreaErrors[district.id]) {
                                setSubAreaErrors((prev) => ({
                                  ...prev,
                                  [district.id]: "",
                                }));
                              }
                            }}
                            placeholder={`Add sub-area in ${district.district}…`}
                            className="form-input text-sm"
                            aria-label={`New sub-area name for ${district.district}`}
                          />
                          {subAreaErrors[district.id] && (
                            <FormError message={subAreaErrors[district.id]} />
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn-primary text-xs px-3 py-2.5"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          Add
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete district confirmation */}
      <DeleteConfirmationModal
        isOpen={!!deleteDistrict}
        title="Delete District?"
        message={
          deleteDistrict
            ? `Are you sure you want to delete the district "${deleteDistrict.district}" and all its ${deleteDistrict.subAreas.length} sub-area(s)?`
            : ""
        }
        onConfirm={() => {
          onDeleteDistrict(deleteDistrict.id);
          setDeleteDistrict(null);
          setSuccessMsg(`District deleted.`);
        }}
        onCancel={() => setDeleteDistrict(null)}
      />

      {/* Delete sub-area confirmation */}
      <DeleteConfirmationModal
        isOpen={!!deleteSubArea}
        title="Delete Sub-area?"
        message={
          deleteSubArea
            ? `Are you sure you want to delete "${deleteSubArea.subArea.name}" from ${deleteSubArea.district.district}?`
            : ""
        }
        onConfirm={() => {
          onDeleteSubArea(deleteSubArea.district.id, deleteSubArea.subArea.id);
          setDeleteSubArea(null);
          setSuccessMsg(`Sub-area deleted.`);
        }}
        onCancel={() => setDeleteSubArea(null)}
      />
    </section>
  );
}

export default AdminAreaManager;
