import { InboxIcon } from "lucide-react";

/**
 * EmptyState – shown when a list has no items.
 * Props:
 *   message  {string} – message to display
 *   icon     {ReactNode} – optional custom icon (defaults to InboxIcon)
 */
function EmptyState({ message, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <div className="mb-4 text-gray-300">
        {icon ?? <InboxIcon className="w-14 h-14" aria-hidden="true" />}
      </div>
      <p className="text-sm text-center max-w-xs">{message}</p>
    </div>
  );
}

export default EmptyState;
