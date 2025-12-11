import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaClipboardList } from "react-icons/fa";

const DashboardLayout = ({ currentUser, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const links = {
    Student: [
      { name: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
      { name: "My Applications", path: "/dashboard/applications", icon: <FaClipboardList /> },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-lg p-6 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}>
        <button
          onClick={toggleSidebar}
          className="mb-6 text-gray-600 focus:outline-none">
          {isSidebarOpen ? "⬅" : "➡"}
        </button>

        <h2 className={`text-xl font-bold mb-6 ${!isSidebarOpen && "hidden"}`}> Dashboard </h2>

        <nav className="flex flex-col gap-4">
          {links[currentUser.role]?.map((link) => (
            <Link key={link.name} to={link.path}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium" >
              {link.icon} {isSidebarOpen && link.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
