import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [application, setApplication] = useState(location.state?.application || null);
  const [scholarship, setScholarship] = useState(location.state?.scholarship || null);
  const [loading, setLoading] = useState(!application);

  const token = localStorage.getItem("access-token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchApplication = async () => {
      if (!application && token) {
        try {
          const res = await axios.get(
            "https://scholarstream.onrender.com/api/applications/my-applications",
            { headers }
          );

          if (!res.data || res.data.length === 0) {
            toast.error("No application found.");
            navigate("/dashboard");
            return;
          }

          const latestPaidApp = res.data.reverse().find((app) => app.paymentStatus === "paid");
          const selectedApp = latestPaidApp || res.data[0];
          setApplication(selectedApp);

          if (!selectedApp.scholarshipDetails && selectedApp.scholarshipId) {
            try {
              const scholarshipRes = await axios.get(
                `https://scholarstream.onrender.com/api/scholarships/${selectedApp.scholarshipId}`,
                { headers }
              );
              setScholarship(scholarshipRes.data.data);
            } catch {
              setScholarship(null);
            }
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to fetch application details.");
          navigate("/dashboard");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [application, navigate, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading payment details...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg font-semibold">
          No payment information found.
        </p>
      </div>
    );
  }

  const getField = (field) =>
    scholarship?.[field] || application?.[field] || "N/A";

  const totalAmount =
    (application.applicationFees || 0) +
    (application.serviceCharge || 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-bold mb-4 text-green-600">
        Payment Successful!
      </h2>

      <div className="bg-white shadow rounded p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">Scholarship Details:</h3>
        <p><strong>Scholarship Name:</strong> {getField("scholarshipName")}</p>
        <p><strong>University:</strong> {getField("universityName")}</p>
        <p><strong>Degree:</strong> {getField("degree")}</p>
        <p><strong>Category:</strong> {getField("scholarshipCategory")}</p>
      </div>

      <div className="bg-white shadow rounded p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3">Payment Details:</h3>
        <p><strong>Payment Status:</strong> {application.paymentStatus || "N/A"}</p>
        <p><strong>Amount Paid:</strong> ${totalAmount}</p>
        <p><strong>Application Date:</strong> {application.applicationDate || "N/A"}</p>
      </div>

      <button
        onClick={() => navigate("/dashboard/student/myapplication")}
        className="mt-5 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold">
        Go to My Applications
      </button>
    </div>
  );
};

export default PaymentSuccess;
