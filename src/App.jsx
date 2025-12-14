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
import PaymentPage from "./pages/PaymentPage";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/scholarships"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <AllScholarships />
              <Footer />
            </>
          }
        />
        <Route path="/scholarship/:id"
          element={
            <>
              <Navbar currentUser={currentUser} />
              <ScholarshipDetails currentUser={currentUser}/>
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />

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

        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
