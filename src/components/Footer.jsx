import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold text-blue-600">ScholarStream</h2>
          <p className="mt-3 text-gray-600 text-sm leading-relaxed">
            Connecting students with global scholarship opportunities. We provide
            verified scholarship information from top universities around the
            world. Our goal is to help students access financial aid and achieve
            their academic dreams. Stay updated with the latest scholarships and
            never miss an opportunity to advance your education.
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm text-center lg:text-left">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li><Link to="/scholarships" className="hover:text-blue-600">All Scholarships</Link></li>
            <li><Link to="/contact" className="hover:text-blue-600">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-blue-600">FAQ</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-center lg:items-start">
          <h3 className="font-bold text-lg mb-3">Follow Us</h3>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-blue-600 hover:text-white hover:bg-blue-600 transition">
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-red-600 hover:text-white hover:bg-red-600 transition">
              <i className="fab fa-youtube text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-blue-500 hover:text-white hover:bg-blue-500 transition">
              <i className="fab fa-linkedin-in text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-black hover:text-white hover:bg-black transition">
              <span className="font-bold text-lg">X</span>
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 text-green-600 hover:text-white hover:bg-green-500 transition">
              <i className="fab fa-skype text-lg"></i>
            </a>
          </div>
        </div>

      </div>

      <div className="border-t mt-8 pt-5 text-center text-gray-600 text-sm">
        © 2025 ScholarStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
