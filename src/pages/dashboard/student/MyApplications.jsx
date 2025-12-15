import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApplications = ({ currentUser }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [editData, setEditData] = useState({ degree: "", scholarshipCategory: "" });
  const [deleteApp, setDeleteApp] = useState(null);

  // Fetch all applications
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

 //Edit functionality
  const handleEditClick = (app) => {
    setEditingApp(app);
    setEditData({
      degree: app.degree || "",
      scholarshipCategory: app.scholarshipCategory || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/applications/${editingApp._id}`, editData);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === editingApp._id ? { ...app, ...editData } : app
        )
      );
      setEditingApp(null);
      toast.success("Application updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update application");
    }
  };

  // Delete functionality
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${deleteApp._id}`);
      setApplications((prev) => prev.filter((app) => app._id !== deleteApp._id));
      toast.success("Application deleted successfully");
      setDeleteApp(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete application");
      setDeleteApp(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;
  if (applications.length === 0)
    return <p className="text-center mt-10">No applications found.</p>;

  return (
    <div className="overflow-x-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="py-2 px-4 border">University Name</th>
            <th className="py-2 px-4 border">University Address</th>
            <th className="py-2 px-4 border">Subject Category</th>
            <th className="py-2 px-4 border">Application Fees</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Feedback</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center text-sm">
              <td className="py-2 px-4 border">
                {app.scholarshipDetails?.universityName || app.universityName}
              </td>
              <td className="py-2 px-4 border">
                {app.scholarshipDetails
                  ? `${app.scholarshipDetails.universityCity}, ${app.scholarshipDetails.universityCountry}`
                  : "-"}
              </td>
              <td className="py-2 px-4 border">
                {app.degree || app.scholarshipDetails?.degree || "-"}
              </td>
              <td className="py-2 px-4 border">${app.applicationFees}</td>
              <td className="py-2 px-4 border capitalize">{app.applicationStatus}</td>
              <td className="py-2 px-4 border">{app.feedback || "-"}</td>
              <td className="py-2 px-4 border flex justify-center gap-2">
                <button onClick={() => setSelectedApp(app)}
                  className="px-3 py-1 bg-blue-500 text-white rounded">
                  Details
                </button>
                {app.applicationStatus === "pending" && (
                  <>
                    <button onClick={() => handleEditClick(app)}
                      className="px-3 py-1 bg-green-500 text-white rounded">
                      Edit
                    </button>
                    <button onClick={() => setDeleteApp(app)}
                      className="px-3 py-1 bg-red-500 text-white rounded">
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedApp.scholarshipDetails ? (
              <>
                <img src={selectedApp.scholarshipDetails.universityImage}
                  alt="University"
                  className="w-24 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-center mb-3">
                  {selectedApp.scholarshipDetails.scholarshipName}
                </h3>
                <p><strong>University:</strong> {selectedApp.scholarshipDetails.universityName}</p>
                <p><strong>Location:</strong> {selectedApp.scholarshipDetails.universityCity}, {selectedApp.scholarshipDetails.universityCountry}</p>
                <p><strong>World Rank:</strong> {selectedApp.scholarshipDetails.universityWorldRank}</p>
                <p><strong>Degree:</strong> {selectedApp.degree || selectedApp.scholarshipDetails.degree || "-"}</p>
                <p><strong>Scholarship Type:</strong> {selectedApp.scholarshipCategory || selectedApp.scholarshipDetails.scholarshipCategory}</p>
                <p><strong>Tuition Fees:</strong> ${selectedApp.scholarshipDetails.tuitionFees}</p>
                <p><strong>Application Fees:</strong> ${selectedApp.applicationFees}</p>
                <p><strong>Service Charge:</strong> ${selectedApp.serviceCharge}</p>
                <p><strong>Deadline:</strong> {selectedApp.scholarshipDetails.applicationDeadline}</p>
                <p><strong>Status:</strong> {selectedApp.applicationStatus}</p>
                <p><strong>Feedback:</strong> {selectedApp.feedback || "N/A"}</p>
              </>
            ) : (
              <p>No scholarship details found.</p>
            )}
            <button onClick={() => setSelectedApp(null)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}

      {editingApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Application</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold">Degree</label>
                <input type="text"
                  value={editData.degree}
                  className="w-full border px-2 py-1 rounded"
                  onChange={(e) => setEditData({ ...editData, degree: e.target.value })}
                  required />
              </div>
              <div>
                <label className="block font-semibold">Scholarship Category</label>
                <input type="text"
                  value={editData.scholarshipCategory}
                  className="w-full border px-2 py-1 rounded"
                  onChange={(e) => setEditData({ ...editData, scholarshipCategory: e.target.value })}
                  required />
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <button type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded" >
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded" >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md text-center">
            <p className="mb-4 text-lg">
              Are you sure you want to delete the application for <strong>{deleteApp.scholarshipDetails?.universityName || deleteApp.universityName}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded" >
                Yes
              </button>
              <button onClick={() => setDeleteApp(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded" >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
