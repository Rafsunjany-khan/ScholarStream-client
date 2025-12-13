import React from "react";
import { Routes, Route } from "react-router-dom";

const ModeratorDashboard = ({ currentModerator }) => {
  if (!currentModerator) {
    return <p className="text-center mt-10">Loading moderator info...</p>;
  }

  return (
    <Routes>
      <Route
        index
        element={
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md mx-auto text-center">
            <img
              src={currentModerator.photoURL || "https://via.placeholder.com/150"}
              alt={currentModerator.name}
              className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">{currentModerator.name}</h2>
            <p className="text-gray-600 mb-1">{currentModerator.email}</p>
            <p className="text-gray-500 font-medium">Role: {currentModerator.role}</p>
          </div>
        }/>

      <Route path="applications"
        element={
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-2xl font-bold mb-4">Manage Applied Applications</h2>
            <p className="text-gray-600">Applications management coming soon...</p>
          </div>
        }/>
    </Routes>
  );
};

export default ModeratorDashboard;
