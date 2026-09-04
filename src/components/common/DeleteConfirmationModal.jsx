import { AlertTriangle } from "lucide-react";

/**
 * DeleteConfirmationModal – shared modal for confirming a delete action.
 * Props:
 *   isOpen      {boolean}  – controls visibility
 *   title       {string}   – modal heading
 *   message     {string}   – confirmation message
 *   onConfirm   {function} – called when user confirms delete
 *   onCancel    {function} – called when user cancels
 */
function DeleteConfirmationModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      onClick={onCancel}
    >
      {/* Modal panel */}
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 bg-red-100 rounded-full p-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="delete-modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
