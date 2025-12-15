import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = ({ currentUser }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  if (!currentUser?.email) {
    setLoading(false);
    return;
  }

  axios
    .get(`http://localhost:5000/api/applications/user/${currentUser.email}`)
    .then((res) => {
      setApplications(res.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, [currentUser]);


  if (loading) return <p className="text-center mt-10">Loading applications...</p>;
  if (applications.length === 0) return <p className="text-center mt-10">No applications found.</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">University Name</th>
            <th className="py-2 px-4 border-b">Subject Category</th>
            <th className="py-2 px-4 border-b">Application Fees</th>
            <th className="py-2 px-4 border-b">Application Status</th>
            <th className="py-2 px-4 border-b">Feedback</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center">
              <td className="py-2 px-4 border-b">{app.universityName}</td>
              <td className="py-2 px-4 border-b">{app.scholarshipCategory}</td>
              <td className="py-2 px-4 border-b">${app.applicationFees}</td>
              <td className="py-2 px-4 border-b">{app.applicationStatus}</td>
              <td className="py-2 px-4 border-b">{app.feedback || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
