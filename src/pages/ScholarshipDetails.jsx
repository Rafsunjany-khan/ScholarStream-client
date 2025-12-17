import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ScholarshipDetails = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  const handleApply = async () => {
    if (!currentUser || currentUser.role !== "Student") {
      toast.error("Please login as a student to apply.");
      return;
    }

    if (!scholarship) {
      toast.error("Scholarship details not loaded yet.");
      return;
    }

    setApplying(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/applications", {
        scholarshipId: scholarship._id,
        userId: currentUser.uid,
        userName: currentUser.name,
        userEmail: currentUser.email,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        scholarshipCategory: scholarship.scholarshipCategory,
        degree: scholarship.degree,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        applicationStatus: "pending",
        paymentStatus: "unpaid",
        applicationDate: new Date().toISOString().split("T")[0],
        feedback: "",
      });

      const application = data.application;

     toast.success("Application saved successfully! Redirecting to payment...", { autoClose: 1500 });
     setTimeout(() => {
       navigate("/checkout", { state: { application, scholarship } });
     }, 1500);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to save application.");
    } finally {
      setApplying(false);
    }
  };

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/scholarships/${id}`);
        setScholarship(data.data);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch scholarship details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading Scholarship Details...</p>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-red-500">Scholarship not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white shadow rounded p-6 md:flex md:gap-6">
        <div className="md:w-1/3 mb-4 md:mb-0 flex items-center justify-center bg-gray-100 rounded overflow-hidden">
          <img src={scholarship.universityImage} alt={scholarship.universityName}
            className="object-contain w-full h-64"/>
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">{scholarship.scholarshipName}</h2>
          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">University:</span> {scholarship.universityName}</p>
            <p><span className="font-semibold">World Rank:</span> {scholarship.universityWorldRank}</p>
            <p><span className="font-semibold">Deadline:</span> {scholarship.applicationDeadline}</p>
            <p><span className="font-semibold">Location:</span> {scholarship.universityCity}, {scholarship.universityCountry}</p>
            <p><span className="font-semibold">Subject Category:</span> {scholarship.subjectCategory}</p>
            <p><span className="font-semibold">Scholarship Category:</span> {scholarship.scholarshipCategory}</p>
            <p><span className="font-semibold">Degree:</span> {scholarship.degree}</p>
            <p><span className="font-semibold">Tuition Fees:</span> ${scholarship.tuitionFees}</p>
            <p><span className="font-semibold">Application Fees:</span> ${scholarship.applicationFees}</p>
            <p><span className="font-semibold">Service Charge:</span> ${scholarship.serviceCharge}</p>
            <p><span className="font-semibold">Posted By:</span> {scholarship.postedUserEmail}</p>
            <p><span className="font-semibold">Post Date:</span> {scholarship.scholarshipPostDate}</p>
          </div>

          {currentUser && currentUser.role === "Student" ? (
            <button onClick={handleApply}
              disabled={applying}
              className="mt-5 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold transition">
              {applying ? "Processing..." : "Apply for Scholarship"}
            </button>
          ) : (
            <p className="mt-5 text-red-500 font-semibold">
              Please login as a student to apply.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
