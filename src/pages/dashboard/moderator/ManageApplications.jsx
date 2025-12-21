import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [cancelApp, setCancelApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchApplications = async () => {
      if (!token) {
        toast.error("Unauthorized! Please login again.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          "https://scholarstream.onrender.com/api/applications",
          axiosConfig
        );
        setApplications(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token]);

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) {
      return toast.warning("Feedback cannot be empty.");
    }

    try {
      await axios.patch(
        `https://scholarstream.onrender.com/api/applications/${feedbackApp._id}/feedback`,
        { feedback: feedbackText },
        axiosConfig
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === feedbackApp._id
            ? { ...app, feedback: feedbackText }
            : app
        )
      );

      toast.success("Feedback submitted successfully!");
      setFeedbackApp(null);
      setFeedbackText("");
    } catch {
      toast.error("Failed to submit feedback.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `https://scholarstream.onrender.com/api/applications/${id}/status`,
        { status: newStatus },
        axiosConfig
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, applicationStatus: newStatus }
            : app
        )
      );

      toast.success("Application status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleCancelConfirm = async () => {
    try {
      await axios.patch(
        `https://scholarstream.onrender.com/api/applications/${cancelApp._id}/status`,
        { status: "rejected" },
        axiosConfig
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === cancelApp._id
            ? { ...app, applicationStatus: "rejected" }
            : app
        )
      );

      toast.success("Application rejected successfully");
      setCancelApp(null);
    } catch {
      toast.error("Failed to reject application");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading applications...</p>;

  if (applications.length === 0)
    return <p className="text-center mt-10">No applications found.</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-4">
        Manage Applied Applications
      </h2>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">University</th>
            <th className="py-2 px-4 border">Feedback</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Payment</th>
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
              <td className="py-2 px-4 border capitalize">
                {app.applicationStatus}
              </td>
              <td className="py-2 px-4 border capitalize">
                {app.paymentStatus}
              </td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                <button
                  onClick={() => setSelectedApp(app)}
                  className="px-3 py-1 bg-blue-500 text-white rounded">
                  Details
                </button>

                <select
                  value={app.applicationStatus}
                  onChange={(e) =>
                    handleStatusChange(app._id, e.target.value)
                  }
                  className="border px-2 py-1 rounded">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  onClick={() => {
                    setFeedbackApp(app);
                    setFeedbackText(app.feedback || "");
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded">
                  Feedback
                </button>

                <button
                  onClick={() => setCancelApp(app)}
                  className="px-3 py-1 bg-red-600 text-white rounded">
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4 text-center">
              Application Details
            </h3>

            <p><b>Name:</b> {selectedApp.userName}</p>
            <p><b>Email:</b> {selectedApp.userEmail}</p>
            <p><b>University:</b> {selectedApp.universityName}</p>
            <p><b>Degree:</b> {selectedApp.degree}</p>
            <p><b>Category:</b> {selectedApp.scholarshipCategory}</p>
            <p><b>Fees:</b> ${selectedApp.applicationFees}</p>
            <p><b>Service:</b> ${selectedApp.serviceCharge}</p>
            <p><b>Status:</b> {selectedApp.applicationStatus}</p>
            <p><b>Payment:</b> {selectedApp.paymentStatus}</p>
            <p><b>Feedback:</b> {selectedApp.feedback || "N/A"}</p>

            <button
              onClick={() => setSelectedApp(null)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {feedbackApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-3 text-center"> Write Feedback </h3>

            <textarea
              rows="5"
              className="w-full border p-2 rounded"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)} />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setFeedbackApp(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {cancelApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md text-center">
            <p className="mb-4 text-lg">
              Reject application for{" "}
              <strong>{cancelApp.universityName}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded">
                Yes
              </button>
              <button
                onClick={() => setCancelApp(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplications;
