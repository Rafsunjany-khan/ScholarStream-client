import React, { useState } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { FaUser, FaClipboardList, FaUsers, FaPlusCircle, FaTasks } from "react-icons/fa";

import StudentDashboard from "./student/StudentDashboard";

import AdminDashboard from "./admin/AdminDashboard";
import AddScholarship from "./admin/AddScholarship";
import ManageScholarships from "./admin/ManageScholarships";
import UserManagement from "./admin/UserManagement";

import ModeratorDashboard from "./moderator/ModeratorDashboard";

const DashboardLayout = ({ currentUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const links = {
    Student: [
      { name: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
      { name: "My Applications", path: "/dashboard/student/myapplication", icon: <FaClipboardList /> },
    ],
    Admin: [
      { name: "Admin Dashboard", path: "/dashboard/admin", icon: <FaUsers /> },
      { name: "Add Scholarship", path: "/dashboard/admin/addscholarship", icon: <FaPlusCircle /> },
      { name: "Manage Scholarships", path: "/dashboard/admin/managescholarship", icon: <FaTasks /> },
      { name: "Manage Users", path: "/dashboard/admin/UserManagement", icon: <FaUser /> },
    ],
    Moderator: [
      { name: "My Profile", path: "/dashboard/moderator/profile", icon: <FaUser /> },
      { name: "Manage Applied Applications", path: "/dashboard/moderator/applications", icon: <FaClipboardList /> },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-lg transition-all duration-300 p-6 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}>
        <button onClick={toggleSidebar} className="mb-6 text-gray-600 focus:outline-none">
          {isSidebarOpen ? "⬅" : "➡"}
        </button>

        <h2 className={`text-xl font-bold mb-6 ${!isSidebarOpen && "hidden"}`}>
          Dashboard
        </h2>

        <nav className="flex flex-col gap-4">
          {links[currentUser.role]?.map((link) => (
            <Link key={link.name}
              to={link.path}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {link.icon}
              {isSidebarOpen && link.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Routes>
          {currentUser.role === "Student" && (
            <>
              <Route path="profile" element={<StudentDashboard currentUser={currentUser} />} />
              <Route path="" element={<Navigate to="profile" replace />} />
            </>
          )}

          {currentUser.role === "Admin" && (
            <>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/addscholarship" element={<AddScholarship currentAdmin={currentUser} />} />
              <Route path="admin/managescholarship" element={<ManageScholarships currentAdmin={currentUser} />} />
              <Route path="admin/UserManagement" element={<UserManagement currentAdmin={currentUser} />} />
              <Route path="" element={<Navigate to="admin" replace />} />
            </>
          )}

          {currentUser.role === "Moderator" && (
            <>
              <Route path="moderator/*" element={<ModeratorDashboard currentModerator={currentUser} />} />
              <Route path="" element={<Navigate to="moderator/" replace />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardLayout;
