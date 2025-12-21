import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scholarship = location.state?.scholarship;
  const errorMessage = location.state?.error;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-red-600"> Payment Failed </h2>

      <div className="bg-white shadow rounded p-6 mb-6">
        <p>
          <strong>Scholarship Name:</strong>{" "}
          {scholarship?.scholarshipName || "N/A"}
        </p>

        <p className="text-red-500 mt-3">
          <strong>Error Message:</strong>{" "}
          {errorMessage || "Payment could not be completed. Please try again."}
        </p>
      </div>

      <button
        onClick={() => navigate("/dashboard/student/myapplication")}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold">
        Return to Dashboard
      </button>
    </div>
  );
};

export default PaymentFailed;
