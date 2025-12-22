import React, { useState } from "react";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { FaUser, FaClipboardList, FaUsers, FaPlusCircle, FaTasks, FaHome, FaBars } from "react-icons/fa";

import StudentDashboard from "./student/StudentDashboard";
import MyApplications from "./student/MyApplications";
import MyReviews from "./student/MyReviews";

import AdminDashboard from "./admin/AdminDashboard";
import AddScholarship from "./admin/AddScholarship";
import ManageScholarships from "./admin/ManageScholarships";
import UserManagement from "./admin/UserManagement";

import ModeratorDashboard from "./moderator/ModeratorDashboard";
import ManageApplications from "./moderator/ManageApplications";
import ManageReviews from "./moderator/ManageReviews";

const DashboardLayout = ({ currentUser }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const links = {
    Student: [
      { name: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
      { name: "My Applications", path: "/dashboard/student/myapplication", icon: <FaClipboardList /> },
      { name: "My Reviews", path: "/dashboard/student/myreviews", icon: <FaClipboardList /> },
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
      { name: "Manage Reviews", path: "/dashboard/moderator/reviews", icon: <FaClipboardList /> },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`fixed md:static top-0 left-0 z-40 bg-white shadow-lg transition-all duration-300 p-6 flex flex-col h-full
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${isSidebarOpen ? "w-64" : "w-16"}`} >
        <div className="flex items-center justify-between mb-6">
          <button onClick={toggleSidebar} className="btn btn-ghost hidden md:flex">
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>

          <button onClick={toggleMobile} className="btn btn-ghost md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h2 className={`text-xl font-bold mb-6 ${!isSidebarOpen && "hidden"}`}>
          Dashboard
        </h2>

        <Link to="/"
          title="Home"
          onClick={() => setIsMobileOpen(false)}
          className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium mb-4">
          <FaHome />
          {isSidebarOpen && "Home"}
        </Link>

        <nav className="flex flex-col gap-4 flex-1">
          {links[currentUser.role]?.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              title={link.name}
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium">
              {link.icon}
              {isSidebarOpen && link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {isMobileOpen && (
        <div
          onClick={toggleMobile}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"/>
      )}

      <div className="flex-1 flex flex-col">
        <div className="md:hidden bg-white shadow px-4 py-3 flex items-center">
          <button onClick={toggleMobile} className="btn btn-ghost text-xl">
            <FaBars />
          </button>
          <span className="ml-4 font-semibold">Dashboard</span>
        </div>

        <main className="flex-1 p-4 md:p-6">
          <Routes>
            {currentUser.role === "Student" && (
              <>
                <Route path="profile" element={<StudentDashboard currentUser={currentUser} />} />
                <Route path="student/myapplication" element={<MyApplications currentUser={currentUser} />} />
                <Route path="student/myreviews" element={<MyReviews currentUser={currentUser} />} />
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
                <Route path="moderator/profile" element={<ModeratorDashboard currentModerator={currentUser} />} />
                <Route path="moderator/applications" element={<ManageApplications currentModerator={currentUser} />} />
                <Route path="moderator/reviews" element={<ManageReviews currentModerator={currentUser} />} />
                <Route path="" element={<Navigate to="moderator/profile" replace />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
