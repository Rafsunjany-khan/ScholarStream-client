import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalScholarships, setTotalScholarships] = useState(0);
  const [totalFees, setTotalFees] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication token not found. Please login again.");
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const usersRes = await axios.get(
          "https://scholarstream.onrender.com/api/users",
          { headers }
        );
        setTotalUsers(usersRes.data.users?.length || 0);

        const scholarshipRes = await axios.get(
          "https://scholarstream.onrender.com/api/scholarships",
          { headers }
        );
        const scholarships = scholarshipRes.data.data || [];
        setTotalScholarships(scholarships.length);

        const fees = scholarships.reduce((sum, sch) => {
          if (sch.paymentStatus === "paid") {
            const appFee = Number(sch.applicationFees) || 0;
            const serviceFee = Number(sch.serviceCharge) || 0;
            return sum + appFee + serviceFee;
          }
          return sum;
        }, 0);
        setTotalFees(fees);

        const universityCount = {};
        scholarships.forEach((sch) => {
          universityCount[sch.universityName] =
            (universityCount[sch.universityName] || 0) + 1;
        });

        const formattedChartData = Object.keys(universityCount).map(
          (university) => ({
            name: university,
            count: universityCount[university],
            fillPercentage: (universityCount[university] / scholarships.length) * 100,
          })
        );

        setChartData(formattedChartData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to load analytics data"
        );
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
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Scholarships</h2>
          <p className="text-3xl font-bold text-green-600">{totalScholarships}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-lg font-semibold mb-2">Total Fees Collected</h2>
          <p className="text-3xl font-bold text-purple-600">{totalFees}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Scholarships per University
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical"
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }} >
            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <YAxis type="category" dataKey="name" width={150} />
            <Tooltip
              formatter={(value, name, props) =>
                `${props.payload.count} scholarships (${value.toFixed(0)}%)`
              }
            />
            <Bar dataKey="fillPercentage">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#2563eb" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
