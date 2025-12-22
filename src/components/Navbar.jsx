import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ currentUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="text-2xl font-bold text-blue-600"> ScholarStream </Link>
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
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                  Student Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                  Student Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="w-9 rounded-full">
                  <img src={currentUser.photoURL || "/default-profile.png"} alt="Profile" />
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 bg-white border rounded shadow-lg w-48 py-2 flex flex-col z-50">
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="px-4 py-2 hover:bg-gray-100 text-gray-700 font-medium">
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

        <button
          className="md:hidden btn btn-ghost btn-circle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu">
          {!mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <Link to="/"
            className="block font-semibold text-gray-700 text-center"
            onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/scholarships"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-semibold text-gray-700 text-center">
            All Scholarships
          </Link>

          {!currentUser ? (
            <>
              <Link to="/login">
                <button className="w-40 mx-auto block px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Student Login
                </button>
              </Link>
              <Link to="/register">
                <button className="w-40 mx-auto block px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
                  Student Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block font-semibold text-gray-700 text-center">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-40 mx-auto block font-semibold text-red-600">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
