import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddScholarship = ({ currentAdmin }) => {
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: new Date().toISOString().split("T")[0],
    postedUserEmail: currentAdmin?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token not found. Please login again.");
        return;
      }

      await axios.post(
        "https://scholarstream.onrender.com/api/scholarships",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token
          },
        }
      );

      toast.success("Scholarship added successfully");
      setFormData({
        scholarshipName: "",
        universityName: "",
        universityImage: "",
        universityCountry: "",
        universityCity: "",
        universityWorldRank: "",
        subjectCategory: "",
        scholarshipCategory: "",
        degree: "",
        tuitionFees: "",
        applicationFees: "",
        serviceCharge: "",
        applicationDeadline: "",
        scholarshipPostDate: new Date().toISOString().split("T")[0],
        postedUserEmail: currentAdmin?.email || "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add scholarship");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-6 text-center">Add Scholarship</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <label className="font-medium">Scholarship Name :</label>
        <input type="text" name="scholarshipName" value={formData.scholarshipName}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />

        <label className="font-medium">University Name :</label>
        <input type="text" name="universityName" value={formData.universityName}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required />

        <label className="font-medium">University Image URL :</label>
        <input type="text" name="universityImage" value={formData.universityImage}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Country :</label>
        <input type="text" name="universityCountry" value={formData.universityCountry}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">City :</label>
        <input type="text" name="universityCity" value={formData.universityCity}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">World Rank :</label>
        <input type="number" name="universityWorldRank" value={formData.universityWorldRank}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Subject Category :</label>
        <input type="text" name="subjectCategory" value={formData.subjectCategory}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Scholarship Category :</label>
        <input type="text" name="scholarshipCategory" value={formData.scholarshipCategory}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Degree :</label>
        <input type="text" name="degree" value={formData.degree}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Tuition Fees (optional) :</label>
        <input type="number" name="tuitionFees" value={formData.tuitionFees}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Application Fees :</label>
        <input type="number" name="applicationFees" value={formData.applicationFees}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Service Charge :</label>
        <input type="number" name="serviceCharge" value={formData.serviceCharge}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <label className="font-medium">Application Deadline :</label>
        <input type="date" name="applicationDeadline" value={formData.applicationDeadline}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        <div className="flex justify-between mt-4">
          <div>
            <label className="font-medium">Admin Email :</label>
            <input type="text" value={formData.postedUserEmail}
              readOnly
              className="border border-gray-300 rounded px-3 py-2 bg-gray-100" />
          </div>
          <div>
            <label className="font-medium">Post Date :</label>
            <input type="text" value={formData.scholarshipPostDate}
              readOnly
              className="border border-gray-300 rounded px-3 py-2 bg-gray-100"/>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded w-full transition-colors">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
