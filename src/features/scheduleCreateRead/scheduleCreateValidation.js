/**
 * scheduleCreateValidation.js – Member 1
 * Validates schedule creation form fields (now includes district + sub-area).
 */

function validateScheduleCreate(fields) {
  const errors = {};

  if (!fields.district) {
    errors.district = "Please select a district.";
  }

  if (!fields.area) {
    errors.area = "Please select a sub-area within the district.";
  }

  if (!fields.lastCollectedDate) {
    errors.lastCollectedDate = "Please select the last collected date.";
  }

  if (!fields.nextCollectionDate) {
    errors.nextCollectionDate = "Please select the next collection date.";
  }

  if (
    fields.lastCollectedDate &&
    fields.nextCollectionDate &&
    fields.nextCollectionDate < fields.lastCollectedDate
  ) {
    errors.nextCollectionDate =
      "Next collection date cannot be earlier than the last collected date.";
  }

  return errors;
}

export default validateScheduleCreate;
