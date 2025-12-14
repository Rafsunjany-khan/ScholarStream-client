import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Page</h2>
      <p>Scholarship ID: {id}</p>
      <p>Implement payment options later.</p>

      <div className="mt-4 flex gap-4">
        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-semibold">
          Pay Now
        </button>
        <button
          onClick={handleBackHome}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 font-semibold">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
