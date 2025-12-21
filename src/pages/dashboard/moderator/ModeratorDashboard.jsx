import React from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";

const ModeratorDashboard = ({ currentModerator }) => {
  if (!currentModerator) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-base-100 shadow-lg rounded-lg p-8 text-center w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Moderator</h2>

        <div className="flex justify-center mb-6">
          <img src={currentModerator.photoURL}
            alt={currentModerator.name || "Moderator"}
            className="w-32 h-32 rounded-full border-4 border-primary"/>
        </div>

        <div className="flex items-center justify-center gap-3 text-lg font-semibold mb-3">
          <FaUser className="text-primary" /> {currentModerator.name}
        </div>

        <div className="flex items-center justify-center gap-3 text-gray-600 text-sm">
          <FaEnvelope className="text-gray-500" /> {currentModerator.email}
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
