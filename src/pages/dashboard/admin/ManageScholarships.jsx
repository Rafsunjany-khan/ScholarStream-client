import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

  const ManageScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [formData, setFormData] = useState({});
  const [deletingScholarship, setDeletingScholarship] = useState(null);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchScholarships = async () => {
    try {
      const res = await axios.get(
        "https://scholarstream.onrender.com/api/scholarships",
        { headers }
      );
      setScholarships(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch scholarships");
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (scholarship) => {
    setEditingScholarship(scholarship);
    setFormData({ ...scholarship });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingScholarship) return;

    try {
      const { _id, ...updateData } = formData;
      await axios.put(
        `https://scholarstream.onrender.com/api/scholarships/${editingScholarship._id}`,
        updateData,
        { headers }
      );
      toast.success("Scholarship updated successfully");
      setEditingScholarship(null);
      fetchScholarships();
    } catch (error) {
      console.error("Failed to update scholarship:", error);
      toast.error("Failed to update scholarship");
    }
  };

  const handleDelete = async (scholarship) => {
    try {
      await axios.delete(
        `https://scholarstream.onrender.com/api/scholarships/${scholarship._id}`,
        { headers }
      );
      toast.success("Scholarship deleted successfully");
      fetchScholarships();
    } catch (error) {
      console.error("Failed to delete scholarship:", error);
      toast.error("Failed to delete scholarship");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Scholarships</h2>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">University</th>
            <th className="p-2 border-b">Country</th>
            <th className="p-2 border-b">City</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.map((sch) => (
            <tr key={sch._id} className="hover:bg-gray-50">
              <td className="p-2 border-b">{sch.scholarshipName}</td>
              <td className="p-2 border-b">{sch.universityName}</td>
              <td className="p-2 border-b">{sch.universityCountry}</td>
              <td className="p-2 border-b">{sch.universityCity}</td>
              <td className="p-2 border-b flex gap-2">
                <button onClick={() => handleEdit(sch)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" >
                  Update
                </button>
                <button onClick={() => setDeletingScholarship(sch)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-xl font-bold mb-4">Update Scholarship</h3>
            <form className="flex flex-col gap-3" onSubmit={handleUpdate}>
              <label>Scholarship Name:</label>
              <input type="text" placeholder="Scholarship Name" name="scholarshipName" value={formData.scholarshipName}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />

              <label>University Name:</label>
              <input type="text" placeholder="University Name" name="universityName" value={formData.universityName}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required/>

              <label>University Image:</label>
              <input type="text" placeholder="University Image URL" name="universityImage" value={formData.universityImage}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Country:</label>
              <input type="text" placeholder="Country" name="universityCountry" value={formData.universityCountry}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />

              <label>City:</label>
              <input type="text" placeholder="City" name="universityCity" value={formData.universityCity}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />

              <label>World Rank:</label>
              <input type="number" placeholder="World Rank" name="universityWorldRank" value={formData.universityWorldRank || ""}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Subject Category:</label>
              <input type="text" placeholder="Subject Category" name="subjectCategory" value={formData.subjectCategory}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Scholarship Category:</label>
              <input type="text" placeholder="Scholarship Category" name="scholarshipCategory" value={formData.scholarshipCategory}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Degree:</label>
              <input type="text" placeholder="Degree" name="degree" value={formData.degree}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Tuition Fees:</label>
              <input type="number" placeholder="Tuition Fees" name="tuitionFees" value={formData.tuitionFees || ""}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Application Fees:</label>
              <input type="number" placeholder="Application Fees" name="applicationFees" value={formData.applicationFees || ""}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Service Charge:</label>
              <input type="number" placeholder="Service Charge" name="serviceCharge" value={formData.serviceCharge || ""}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <label>Application Deadline:</label>
              <input type="date" placeholder="Application Deadline" name="applicationDeadline"
                value={formData.applicationDeadline?.split("T")[0] || ""}
                onChange={handleChange}
                className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <div className="flex justify-end gap-2 mt-4">
                <button type="button"
                  onClick={() => setEditingScholarship(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" >
                  Cancel
                </button>
                <button type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingScholarship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <h3 className="text-xl font-bold mb-4">
              Are you sure you want to delete <br /> "{deletingScholarship.scholarshipName}"?
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  handleDelete(deletingScholarship);
                  setDeletingScholarship(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" >
                Yes
              </button>
              <button
                onClick={() => setDeletingScholarship(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
