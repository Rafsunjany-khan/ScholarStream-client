import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllScholarships from "./pages/AllScholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Footer from "./components/Footer";
import Register from "./authentication/Register";
import Login from "./authentication/Login";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
       <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<AllScholarships />} />
          <Route path="/scholarship/:id" element={<ScholarshipDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;