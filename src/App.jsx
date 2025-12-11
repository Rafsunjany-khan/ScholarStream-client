import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllScholarships from "./pages/AllScholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import StudentDashboard from "./pages/StudentDashboard";
import Footer from "./components/Footer";
import Register from "./authentication/Register";
import Login from "./authentication/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar currentUser={currentUser} />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login"  element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<AllScholarships />} />
          <Route path="/scholarship/:id" element={<ScholarshipDetails />} />


          <Route
            path="/dashboard"
            element={
              currentUser ? (
                <StudentDashboard currentUser={currentUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
