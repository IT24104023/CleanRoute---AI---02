import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

/**
 * DeleteScheduleModal – Member 2
 * Confirmation dialog before deleting a schedule.
 * Wraps the shared DeleteConfirmationModal with schedule-specific copy.
 * Props:
 *   schedule  {object|null} – schedule to delete (null = closed)
 *   onConfirm {function}    – called when user confirms
 *   onCancel  {function}    – called when user cancels
 */
function DeleteScheduleModal({ schedule, onConfirm, onCancel }) {
  return (
    <DeleteConfirmationModal
      isOpen={!!schedule}
      title="Delete Schedule?"
      message={
        schedule
          ? `Are you sure you want to delete the collection schedule for ${schedule.area}?`
          : ""
      }
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default DeleteScheduleModal;
