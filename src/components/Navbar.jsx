import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ScholarStream
        </Link>

        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 font-bold">Home</Link>
          </li>
          <li>
            <Link to="/scholarships" className="hover:text-blue-600 font-bold">All Scholarships</Link>
          </li>
        </ul>

        <div className="hidden md:flex gap-3">
          <Link to="/login">
            <button className="btn btn-outline btn-sm bg-blue-600 text-white hover:bg-blue-700">Student Login</button>
          </Link>
          <Link to="/register">
            <button className="btn btn-outline btn-sm bg-blue-600 text-white hover:bg-blue-700">Student Register</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
