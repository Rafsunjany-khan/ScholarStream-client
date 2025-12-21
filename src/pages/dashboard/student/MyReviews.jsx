import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyReviews = ({ currentUser }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editData, setEditData] = useState({ reviewComment: "", ratingPoint: 1 });
  const [deleteReview, setDeleteReview] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `https://scholarstream.onrender.com/api/reviews/user/${currentUser.email}`,
          { headers }
        );

        setReviews(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [currentUser, token, refreshFlag]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    try {
      await axios.put(
        `https://scholarstream.onrender.com/api/reviews/${editingReview._id}`,
        editData,
        { headers }
      );
      toast.success("Review updated successfully!");
      setEditingReview(null);
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update review");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteReview) return;

    try {
      await axios.delete(`https://scholarstream.onrender.com/api/reviews/${deleteReview._id}`, { headers });
      toast.success("Review deleted successfully");
      setDeleteReview(null);
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete review");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!reviews.length) return <p className="text-center mt-10">No reviews found</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      <table className="min-w-full border">
        <thead className="bg-gray-100 text-sm">
          <tr>
            <th className="border p-2">Scholarship</th>
            <th className="border p-2">University</th>
            <th className="border p-2">Comment</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev) => (
            <tr key={rev._id} className="text-center text-sm">
              <td className="border p-2">{rev.scholarshipName}</td>
              <td className="border p-2">{rev.universityName}</td>
              <td className="border p-2">{rev.reviewComment}</td>
              <td className="border p-2">
                {rev.reviewDate ? new Date(rev.reviewDate).toLocaleDateString() : "-"}
              </td>
              <td className="border p-2">{rev.ratingPoint}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingReview(rev);
                    setEditData({
                      reviewComment: rev.reviewComment,
                      ratingPoint: rev.ratingPoint,
                    });
                  }}
                  className="bg-green-500 px-3 py-1 text-white rounded" >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteReview(rev)}
                  className="bg-red-500 px-3 py-1 text-white rounded" >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Review</h3>
            <form onSubmit={handleEditSubmit}>
              <textarea
                value={editData.reviewComment}
                onChange={(e) => setEditData({ ...editData, reviewComment: e.target.value })}
                className="w-full border p-2 mb-3 rounded"
                rows={4}
                required />
              <input type="number" min="1" max="5"
                value={editData.ratingPoint}
                onChange={(e) => setEditData({ ...editData, ratingPoint: Number(e.target.value) })}
                className="w-full border p-2 mb-3 rounded"
                required />
              <div className="flex justify-end gap-2">
                <button type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-3 py-1 bg-gray-400 text-white rounded" >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteReview && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this review?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteReview(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded" >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-3 py-1 bg-red-500 text-white rounded" >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
