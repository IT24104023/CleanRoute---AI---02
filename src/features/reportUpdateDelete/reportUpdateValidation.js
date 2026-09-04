/**
 * reportUpdateValidation.js – Member 4
 */

function validateReportUpdate(fields, isAdminMode = false) {
  const errors = {};

  if (!fields.district) {
    errors.district = "Please select a district.";
  }

  if (!fields.area) {
    errors.area = "Please select a sub-area.";
  }

  if (!fields.collectionDate) {
    errors.collectionDate = "Please select the collection date.";
  }

  if (!fields.description || fields.description.trim() === "") {
    errors.description = "Please enter a short description.";
  }

  if (isAdminMode && !fields.status) {
    errors.status = "Please select a status.";
  }

  return errors;
}

export default validateReportUpdate;
