import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/scholarships");
        setScholarships(data.data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading Scholarships...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Scholarships</h2>

      {scholarships.length === 0 ? (
        <p className="text-center text-gray-600">No scholarships found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <div key={scholarship._id} className="bg-white shadow rounded p-4 flex flex-col">
              <img src={scholarship.universityImage} alt={scholarship.universityName}
                className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold mb-1">{scholarship.universityName}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Scholarship:</span> {scholarship.scholarshipCategory}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Location:</span> {scholarship.universityCity}, {scholarship.universityCountry}
              </p>
              {scholarship.applicationFees && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Application Fees:</span> ${scholarship.applicationFees}
                </p>
              )}
              <button
                onClick={() => navigate(`/scholarship/${scholarship._id}`)}
                className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold" >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
