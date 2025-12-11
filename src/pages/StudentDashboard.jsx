import React from "react";

const StudentDashboard = ({ currentUser }) => {
  if (!currentUser) return <p>Loading user info...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <img src={currentUser.photoURL} alt={currentUser.name}
          className="w-24 h-24 rounded-full mx-auto mb-4"/>
        <h2 className="text-2xl font-bold mb-2">{currentUser.name}</h2>
        <p className="text-gray-600 mb-1">{currentUser.email}</p>
        <p className="text-gray-500">Role: {currentUser.role}</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
