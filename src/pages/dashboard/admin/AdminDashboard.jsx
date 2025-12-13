import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("http://localhost:5000/api/users");
        setTotalUsers(usersRes.data.users?.length || 0);

        const scholarshipsRes = await axios.get("http://localhost:5000/api/scholarships");
        setTotalScholarships(scholarshipsRes.data.scholarships?.length || 0);

        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch dashboard data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Total Users</h2>
        <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Total Scholarships</h2>
        <p className="text-3xl font-bold text-green-600">{totalScholarships}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
