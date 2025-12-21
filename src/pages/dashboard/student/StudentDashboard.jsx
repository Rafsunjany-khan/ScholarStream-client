import React from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";

const StudentDashboard = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-base-100 shadow-lg rounded-lg p-8 text-center w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Student</h2>
        <div className="flex justify-center mb-6">
          <img src={currentUser.photoURL}
            alt={currentUser.name || "Student"}
            className="w-32 h-32 rounded-full border-4 border-primary"/>
        </div>

        <div className="flex items-center justify-center gap-3 text-lg font-semibold mb-3">
          <FaUser className="text-primary" /> {currentUser.name}
        </div>

        <div className="flex items-center justify-center gap-3 text-gray-600 text-sm">
          <FaEnvelope className="text-gray-500" /> {currentUser.email}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
