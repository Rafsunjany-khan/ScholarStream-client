import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ScholarStream
        </Link>

        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 font-bold"> Home </Link>
          </li>
          <li>
            <Link to="/scholarships" className="hover:text-blue-600 font-bold"> All Scholarships </Link>
          </li>
        </ul>

        <div className="hidden md:flex gap-3 items-center relative">
          {!currentUser ? (
            <>
              <Link to="/login">
                <button className="btn btn-outline btn-sm bg-blue-600 text-white hover:bg-blue-700">
                  Student Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn-outline btn-sm bg-blue-600 text-white hover:bg-blue-700">
                  Student Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)} >
                <img src={currentUser.photoURL || "/default-profile.png"} alt="Profile"
                  className="w-8 h-8 rounded-full" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white border rounded shadow-lg w-48 py-2 flex flex-col z-50">
                  <Link to="/dashboard"
                    className="px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium"
                    onClick={() => setDropdownOpen(false)} >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium">
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
