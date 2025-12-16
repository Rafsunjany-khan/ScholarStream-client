import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModeratorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null); // for details modal

  // Fetch all applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/applications");
        setApplications(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;
  if (applications.length === 0)
    return <p className="text-center mt-10">No applications found.</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Manage Applied Applications</h2>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="py-2 px-4 border">Applicant Name</th>
            <th className="py-2 px-4 border">Applicant Email</th>
            <th className="py-2 px-4 border">University Name</th>
            <th className="py-2 px-4 border">Application Feedback</th>
            <th className="py-2 px-4 border">Application Status</th>
            <th className="py-2 px-4 border">Payment Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center text-sm">
              <td className="py-2 px-4 border">{app.userName}</td>
              <td className="py-2 px-4 border">{app.userEmail}</td>
              <td className="py-2 px-4 border">{app.universityName}</td>
              <td className="py-2 px-4 border">{app.feedback || "-"}</td>
              <td className="py-2 px-4 border capitalize">{app.applicationStatus}</td>
              <td className="py-2 px-4 border capitalize">{app.paymentStatus}</td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                <button onClick={() => setSelectedApp(app)}
                  className="px-3 py-1 bg-blue-500 text-white rounded" >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-center mb-4">Application Details</h3>
            <p><strong>Applicant Name:</strong> {selectedApp.userName}</p>
            <p><strong>Applicant Email:</strong> {selectedApp.userEmail}</p>
            <p><strong>University Name:</strong> {selectedApp.universityName}</p>
            <p><strong>Degree:</strong> {selectedApp.degree || "-"}</p>
            <p><strong>Scholarship Category:</strong> {selectedApp.scholarshipCategory || "-"}</p>
            <p><strong>Application Fees:</strong> ${selectedApp.applicationFees}</p>
            <p><strong>Service Charge:</strong> ${selectedApp.serviceCharge}</p>
            <p><strong>Application Status:</strong> {selectedApp.applicationStatus}</p>
            <p><strong>Payment Status:</strong> {selectedApp.paymentStatus}</p>
            <p><strong>Application Feedback:</strong> {selectedApp.feedback || "N/A"}</p>
            <p><strong>Application Date:</strong> {selectedApp.applicationDate}</p>

            {selectedApp.scholarshipDetails && (
              <>
                <p><strong>Scholarship Name:</strong> {selectedApp.scholarshipDetails.scholarshipName}</p>
                <p><strong>Location:</strong> {selectedApp.scholarshipDetails.universityCity}, {selectedApp.scholarshipDetails.universityCountry}</p>
                <p><strong>Tuition Fees:</strong> ${selectedApp.scholarshipDetails.tuitionFees}</p>
                <p><strong>Deadline:</strong> {selectedApp.scholarshipDetails.applicationDeadline}</p>
              </>
            )}
            <button onClick={() => setSelectedApp(null)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded" >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModeratorDashboard;
