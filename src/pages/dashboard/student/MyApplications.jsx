import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApplications = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedApp, setSelectedApp] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [editData, setEditData] = useState({ degree: "", scholarshipCategory: "" });
  const [deleteApp, setDeleteApp] = useState(null);
  const [reviewApp, setReviewApp] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 1, comment: "" });

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (!currentUser) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
    }
  }, [currentUser, setCurrentUser]);


  useEffect(() => {
    const fetchApplications = async () => {
      if (!currentUser?.email || !token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `https://scholarstream.onrender.com/api/applications/user/${currentUser.email}`,
          { headers }
        );

        const appsWithDetails = await Promise.all(
          data.map(async (app) => {
            if (!app.scholarshipDetails && app.scholarshipId) {
              try {
                const res = await axios.get(
                  `https://scholarstream.onrender.com/api/scholarships/${app.scholarshipId}`
                );
                return { ...app, scholarshipDetails: res.data.data };
              } catch {
                return app;
              }
            }
            return app;
          })
        );

        setApplications(appsWithDetails);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser, token]);


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
      await axios.put(
        `https://scholarstream.onrender.com/api/applications/${editingApp._id}`,
        editData,
        { headers }
      );
      setApplications((prev) =>
        prev.map((app) => (app._id === editingApp._id ? { ...app, ...editData } : app))
      );
      setEditingApp(null);
      toast.success("Application updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update application");
    }
  };


  const handleDeleteConfirm = async () => {
  if (deleteApp.paymentStatus === "paid") {
    toast.error("Cannot delete a paid application");
    setDeleteApp(null);
    return;
  }

  try {
    await axios.delete(
      `https://scholarstream.onrender.com/api/applications/${deleteApp._id}`,
      { headers }
    );
    setApplications((prev) => prev.filter((app) => app._id !== deleteApp._id));
    toast.success("Application deleted successfully");
    setDeleteApp(null);
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete application");
    setDeleteApp(null);
  }
  };


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.email) {
      toast.error("You must be logged in to submit a review");
      return;
    }
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      toast.error("Rating must be between 1 and 5");
      return;
    }
    if (!reviewData.comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      const payload = {
        scholarshipId: reviewApp.scholarshipDetails?._id || reviewApp.scholarshipId,
        scholarshipName: reviewApp.scholarshipDetails?.scholarshipName || reviewApp.scholarshipName,
        universityName: reviewApp.scholarshipDetails?.universityName || reviewApp.universityName,
        userName: currentUser.name,
        userEmail: currentUser.email,
        userImage: currentUser.photoURL || "",
        ratingPoint: reviewData.rating,
        reviewComment: reviewData.comment,
        reviewDate: new Date(),
      };

      await axios.post(
        "https://scholarstream.onrender.com/api/reviews",
        payload,
        { headers }
      );

      toast.success("Review added successfully!");
      setReviewApp(null);
      setReviewData({ rating: 1, comment: "" });
    } catch (error) {
      console.error(error.response || error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;
  if (applications.length === 0) return <p className="text-center mt-10">No applications found.</p>;

  return (
    <div className="overflow-x-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="py-2 px-4 border">University Name</th>
            <th className="py-2 px-4 border">Degree</th>
            <th className="py-2 px-4 border">Application Fees</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center text-sm">
              <td className="py-2 px-4 border">{app.scholarshipDetails?.universityName || app.universityName}</td>
              <td className="py-2 px-4 border">{app.degree || app.scholarshipDetails?.degree || "-"}</td>
              <td className="py-2 px-4 border">${app.applicationFees}</td>
              <td className="py-2 px-4 border capitalize">{app.applicationStatus}</td>
              <td className="py-2 px-4 border flex justify-center gap-2 flex-wrap">
                <button onClick={() => setSelectedApp(app)} className="px-3 py-1 bg-blue-500 text-white rounded">Details</button>

                {app.applicationStatus === "pending" && (
                  <>
                    <button onClick={() => handleEditClick(app)} className="px-3 py-1 bg-green-500 text-white rounded">Edit</button>
                    {app.paymentStatus === "unpaid" && (
                      <button
                        onClick={() =>
                          navigate("/checkout", { state: { application: app, scholarship: app.scholarshipDetails } })
                        }
                        className="px-3 py-1 bg-yellow-500 text-white rounded" >
                        Pay
                      </button>
                    )}
                    {app.paymentStatus !== "paid" && (
                      <button
                        onClick={() => setDeleteApp(app)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                    )}
                  </>
                 )}


                {app.paymentStatus === "paid" && currentUser && app.userEmail === currentUser.email && (
                  <button onClick={() => setReviewApp(app)} className="px-3 py-1 bg-purple-500 text-white rounded">Add Review</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      {selectedApp && <DetailsModal app={selectedApp} close={() => setSelectedApp(null)} />}
      {editingApp && <EditModal editData={editData} setEditData={setEditData} submit={handleEditSubmit} close={() => setEditingApp(null)} />}
      {deleteApp && <DeleteModal app={deleteApp} confirm={handleDeleteConfirm} close={() => setDeleteApp(null)} />}
      {reviewApp && <ReviewModal reviewData={reviewData} setReviewData={setReviewData} submit={handleReviewSubmit} close={() => setReviewApp(null)} />}
    </div>
  );
};


const DetailsModal = ({ app, close }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      {app.scholarshipDetails ? (
        <>
          <img src={app.scholarshipDetails.universityImage} alt="University" className="w-24 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-center mb-3">{app.scholarshipDetails.scholarshipName}</h3>
          <p><strong>University:</strong> {app.scholarshipDetails.universityName}</p>
          <p><strong>Location:</strong> {app.scholarshipDetails.universityCity}, {app.scholarshipDetails.universityCountry}</p>
          <p><strong>Degree:</strong> {app.degree || app.scholarshipDetails.degree || "-"}</p>
          <p><strong>Scholarship Type:</strong> {app.scholarshipCategory || app.scholarshipDetails.scholarshipCategory}</p>
          <p><strong>Tuition Fees:</strong> ${app.scholarshipDetails.tuitionFees}</p>
          <p><strong>Application Fees:</strong> ${app.applicationFees}</p>
          <p><strong>Service Charge:</strong> ${app.serviceCharge}</p>
          <p><strong>Deadline:</strong> {app.scholarshipDetails.applicationDeadline}</p>
          <p><strong>Status:</strong> {app.applicationStatus}</p>
        </>
      ) : (
        <p>No scholarship details found.</p>
      )}
      <button onClick={close} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">Close</button>
    </div>
  </div>
);

const EditModal = ({ editData, setEditData, submit, close }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-full max-w-md max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">Edit Application</h3>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block font-semibold">Degree</label>
          <input type="text" value={editData.degree} className="w-full border px-2 py-1 rounded" onChange={(e) => setEditData({ ...editData, degree: e.target.value })} required />
        </div>
        <div>
          <label className="block font-semibold">Scholarship Category</label>
          <input type="text" value={editData.scholarshipCategory} className="w-full border px-2 py-1 rounded" onChange={(e) => setEditData({ ...editData, scholarshipCategory: e.target.value })} required />
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <button type="button" onClick={close} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
);

const DeleteModal = ({ app, confirm, close }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-full max-w-md text-center">
      <p className="mb-4 text-lg">
        Are you sure you want to delete the application for <strong>{app.scholarshipDetails?.universityName || app.universityName}</strong>?
      </p>
      <div className="flex justify-center gap-4">
        <button onClick={confirm} className="px-4 py-2 bg-red-500 text-white rounded">Yes</button>
        <button onClick={close} className="px-4 py-2 bg-gray-500 text-white rounded">No</button>
      </div>
    </div>
  </div>
);

const ReviewModal = ({ reviewData, setReviewData, submit, close }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded w-full max-w-md max-h-[80vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-4">Add Review</h3>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block font-semibold">Rating (1-5)</label>
          <input type="number" min={1} max={5} value={reviewData.rating} className="w-full border px-2 py-1 rounded" onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })} required />
        </div>
        <div>
          <label className="block font-semibold">Comment</label>
          <textarea value={reviewData.comment} className="w-full border px-2 py-1 rounded" onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })} required />
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <button type="button" onClick={close} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  </div>
);

export default MyApplications;
