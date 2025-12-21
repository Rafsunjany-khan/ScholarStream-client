import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllScholarships from "./pages/AllScholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import CheckOut from "./pages/CheckOut";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import ErrorPage from "./pages/ErrorPage";


function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/scholarships"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <AllScholarships />
              <Footer />
            </>
          }
        />
        <Route
          path="/scholarship/:id"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <ScholarshipDetails currentUser={currentUser} />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <Login setCurrentUser={setCurrentUser} />
              <Footer />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            currentUser ? (
              <DashboardLayout currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/checkout"
          element={
            currentUser ? (
              <>
                <Navbar currentUser={currentUser} />
                <CheckOut />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/payment-success"
          element={
            currentUser ? (
              <>
                <Navbar currentUser={currentUser} />
                <PaymentSuccess />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/payment-failed"
          element={
            currentUser ? (
              <>
                <Navbar currentUser={currentUser} />
                <PaymentFailed />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <ErrorPage />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
