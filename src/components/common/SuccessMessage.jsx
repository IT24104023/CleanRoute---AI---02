import { CheckCircle } from "lucide-react";

/**
 * SuccessMessage – green success feedback banner.
 * Props:
 *   message {string} – success text to display
 */
function SuccessMessage({ message }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-3 text-sm font-medium"
    >
      <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-600" aria-hidden="true" />
      {message}
    </div>
  );
}

export default SuccessMessage;
