import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-700"
        >
          Student Management System
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-blue-600 transition duration-200"
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              to="/classView"
              className="hover:text-blue-600 transition duration-200"
            >
              Classes
            </Link>
          </li>
          <li>
            <Link
              to="/schoolView"
              className="hover:text-blue-600 transition duration-200"
            >
              School
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}