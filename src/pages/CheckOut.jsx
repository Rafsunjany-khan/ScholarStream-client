import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ application, scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const amount = application.applicationFees + application.serviceCharge;

  const handlePayNow = async () => {
    if (!currentUser || currentUser.role !== "Student") {
      toast.error("Only students can make payments.");
      return;
    }

    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const { data } = await axios.post(
        "https://scholarstream.onrender.com/api/payment/create-payment-intent",
        { amount },
        { headers }
      );

      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentResult.error) {
        await axios.post(
          "https://scholarstream.onrender.com/api/payment/confirm-payment",
          {
            applicationId: application._id,
            paymentStatus: "unpaid",
          },
          { headers }
        );

        navigate("/payment-failed", {
          state: {
            scholarship,
            error: paymentResult.error.message,
          },
        });
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        const res = await axios.post(
          "https://scholarstream.onrender.com/api/payment/confirm-payment",
          {
            applicationId: application._id,
            paymentStatus: "paid",
          },
          { headers }
        );

        toast.success("Payment successful!");

        navigate("/payment-success", {
          state: {
            application: res.data.application,
            scholarship,
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayLater = () => {
    if (!currentUser || currentUser.role !== "Student") {
      toast.error("Only students can make payments.");
      return;
    }

    toast.info("Application saved. You can pay later from your dashboard.");
    navigate("/dashboard/student/myapplication");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>
      <p className="mb-4 font-semibold">Amount to Pay: ${amount}</p>

      <div className="mb-4 p-4 border rounded bg-gray-50">
        <CardElement />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handlePayNow}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-semibold transition">
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button
          onClick={handlePayLater}
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700 font-semibold transition">
          Pay Later
        </button>
      </div>
    </div>
  );
};

const CheckOut = () => {
  const location = useLocation();
  const application = location.state?.application;
  const scholarship = location.state?.scholarship;

  if (!application) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 font-semibold">
          No application found. Please apply first.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm application={application} scholarship={scholarship} />
    </Elements>
  );
};

export default CheckOut;
