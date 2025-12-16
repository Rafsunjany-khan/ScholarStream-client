import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModeratorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackApp, setFeedbackApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

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

  //Feedback functionality
  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) {
      return toast.warning("Feedback cannot be empty.");
    }

    try {
      await axios.patch(
        `http://localhost:5000/api/applications/${feedbackApp._id}/feedback`,
        { feedback: feedbackText }
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
    } catch (error) {
      toast.error("Failed to submit feedback.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
  try {
    await axios.patch(
      `http://localhost:5000/api/applications/${id}/status`,
      { status: newStatus }
    );

    setApplications((prev) =>
      prev.map((app) =>
        app._id === id
          ? { ...app, applicationStatus: newStatus }
          : app
      )
    );

    toast.success("Application status updated");
  } catch (error) {
    toast.error("Failed to update status");
  }
 };


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
                <select value={app.applicationStatus}
                  onChange={(e) => handleStatusChange(app._id, e.target.value)}
                  className="border px-2 py-1 rounded text-sm">
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                </select>

                <button onClick={() => { setFeedbackApp(app); setFeedbackText(app.feedback || ""); }}
                  className="px-3 py-1 bg-green-600 text-white rounded">
                  Feedback
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

      {feedbackApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-3 text-center"> Write Feedback </h3>

            <textarea rows="5"
              placeholder="Write application feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full border p-2 rounded" />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setFeedbackApp(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded" >
                Cancel
              </button>
              <button onClick={handleFeedbackSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded" >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ModeratorDashboard;
