import { AlertCircle } from "lucide-react";

/**
 * FormError – displays a single inline validation error message.
 * Props:
 *   message {string} – error text to display
 */
function FormError({ message }) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="flex items-center gap-1.5 text-red-600 text-sm mt-1.5"
    >
      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export default FormError;
