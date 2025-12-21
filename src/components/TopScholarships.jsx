import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TopScholarships = () => {
  const [topScholarships, setTopScholarships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopScholarships = async () => {
      try {
        const token = localStorage.getItem("access-token");

        const { data } = await axios.get(
          "https://scholarstream.onrender.com/api/scholarships",
          token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : undefined
        );

        const sorted = data.data
          .sort((a, b) => {
            if (a.applicationFees && b.applicationFees) {
              return a.applicationFees - b.applicationFees;
            }
            return new Date(b.postDate) - new Date(a.postDate);
          })
          .slice(0, 6);

        setTopScholarships(sorted);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch top scholarships");
      }
    };

    fetchTopScholarships();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Top Scholarships</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topScholarships.map((scholarship) => (
          <div key={scholarship._id} className="card bg-base-100 shadow-lg p-4 flex flex-col">
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
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Fees:</span> ${scholarship.applicationFees}
              </p>
            )}
            <button onClick={() => navigate(`/scholarship/${scholarship._id}`)}
              className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold" >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopScholarships;
