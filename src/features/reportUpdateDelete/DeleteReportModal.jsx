import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

/**
 * DeleteReportModal – Member 4
 * Confirmation dialog before deleting a report.
 * Props:
 *   isOpen    {boolean}  – whether modal is visible
 *   onConfirm {function} – called on confirm
 *   onCancel  {function} – called on cancel
 */
function DeleteReportModal({ isOpen, onConfirm, onCancel }) {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      title="Delete Report?"
      message="Are you sure you want to permanently delete this report? This action cannot be undone."
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default DeleteReportModal;
