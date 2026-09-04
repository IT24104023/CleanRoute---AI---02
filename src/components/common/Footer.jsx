import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Footer – shared footer with subtle admin access link.
 * The Admin link is intentionally low-visibility here (not in the Navbar).
 */
function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="section-container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 text-green-700 font-bold text-lg">
            <div className="bg-green-100 rounded-lg p-1">
              <Leaf className="w-3.5 h-3.5 text-green-600" aria-hidden="true" />
            </div>
            CleanRoute
          </div>

          {/* Public links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-green-700 transition-colors focus:outline-none focus:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="hover:text-green-700 transition-colors focus:outline-none focus:underline">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-green-700 transition-colors focus:outline-none focus:underline">
                  Reports
                </Link>
              </li>
            </ul>
          </nav>

          {/* Prototype disclaimer */}
          <p className="text-xs text-gray-300 text-center md:text-right">
            Sample / Prototype Data Only
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-300">
            CleanRoute · SE3090 Software Engineering Frameworks · Assignment 2
          </p>

          {/* Subtle admin access – intentionally low visibility */}
          <Link
            to="/admin"
            className="text-xs text-gray-200 hover:text-gray-400 transition-colors focus:outline-none focus:underline"
            aria-label="Admin access"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
