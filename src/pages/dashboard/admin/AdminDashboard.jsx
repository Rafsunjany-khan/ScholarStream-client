import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const usersRes = await axios.get("http://localhost:5000/api/users");
        setTotalUsers(usersRes.data.users?.length || 0);

        const scholarshipRes = await axios.get(
          "http://localhost:5000/api/scholarships"
        );
        const scholarships = scholarshipRes.data.data || [];
        setTotalScholarships(scholarships.length);

        setTotalFees(0);

        const universityCount = {};
        scholarships.forEach((sch) => {
          universityCount[sch.universityName] =
            (universityCount[sch.universityName] || 0) + 1;
        });

        const formattedChartData = Object.keys(universityCount).map(
          (university) => ({
            name: university,
            count: universityCount[university],
          })
        );

        setChartData(formattedChartData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load analytics data");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Scholarships</h2>
          <p className="text-3xl font-bold text-green-600"> {totalScholarships} </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2"> Total Fees Collected </h2>
          <p className="text-3xl font-bold text-purple-600"> {totalFees} </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-center"> Scholarships per University </h2>
       <ResponsiveContainer width="100%" height={400}>
       <BarChart
         data={chartData}
         layout="vertical"
         margin={{ top: 20, right: 30, left: 120, bottom: 20 }} >
      <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          width={150} />
      <Tooltip />
      <Bar dataKey="count" fill="#2563eb" />
      </BarChart>
      </ResponsiveContainer>
    </div>
</div>
  );
};

export default AdminDashboard;
