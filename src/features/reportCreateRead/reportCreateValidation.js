/**
 * reportCreateValidation.js – Member 3
 */

function validateReportCreate(fields) {
  const errors = {};

  if (!fields.district) {
    errors.district = "Please select a district.";
  }

  if (!fields.area) {
    errors.area = "Please select a sub-area within the district.";
  }

  if (!fields.collectionDate) {
    errors.collectionDate = "Please select the collection date.";
  }

  if (!fields.description || fields.description.trim() === "") {
    errors.description = "Please enter a short description.";
  }

  // Phone is optional but must be valid format if provided
  if (fields.phone && !/^[0-9+\-\s()]{7,15}$/.test(fields.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  return errors;
}

export default validateReportCreate;
