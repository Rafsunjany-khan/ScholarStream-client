import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteReview, setDeleteReview] = useState(null);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "https://scholarstream.onrender.com/api/reviews",
          { headers }
        );
        setReviews(data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);

        if (error.response?.status === 401) {
          toast.error("Unauthorized. Please login again.");
        } else if (error.response?.status === 403) {
          toast.error("Access denied. Moderator role required.");
        } else if (error.response?.status === 404) {
          toast.error("API endpoint not found.");
        } else {
          toast.error("Failed to fetch reviews.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [token]);


  const handleDeleteReview = async () => {
    if (!deleteReview) return;

    try {
      await axios.delete(
        `https://scholarstream.onrender.com/api/reviews/${deleteReview._id}`,
        { headers }
      );

      setReviews((prev) =>
        prev.filter((rev) => rev._id !== deleteReview._id)
      );

      toast.success("Review deleted successfully!");
      setDeleteReview(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete review.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-center mt-10">No reviews found.</p>;

  return (
    <div className="p-4 overflow-x-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="py-2 px-4 border">User Name</th>
            <th className="py-2 px-4 border">User Email</th>
            <th className="py-2 px-4 border">Scholarship Name</th>
            <th className="py-2 px-4 border">Rating</th>
            <th className="py-2 px-4 border">Comment</th>
            <th className="py-2 px-4 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev) => (
            <tr key={rev._id} className="text-center text-sm">
              <td className="py-2 px-4 border">{rev.userName || "N/A"}</td>
              <td className="py-2 px-4 border">{rev.userEmail || "N/A"}</td>
              <td className="py-2 px-4 border">{rev.scholarshipName || "N/A"}</td>
              <td className="py-2 px-4 border">{rev.ratingPoint || "0"}</td>
              <td className="py-2 px-4 border max-w-xs truncate">{rev.reviewComment || "No comment"}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => setDeleteReview(rev)}
                  className="px-3 py-1 bg-red-600 text-white rounded flex items-center gap-1 justify-center hover:bg-red-700" >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteReview && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete the review by <strong>{deleteReview.userName}</strong> for <strong>{deleteReview.scholarshipName}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteReview(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500" >
                Cancel
              </button>
              <button
                onClick={handleDeleteReview}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;