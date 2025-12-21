import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6">
      <img src="/assets/images/error-404.png"
        alt="404 Error"
        className="max-w-lg w-full mb-6"/>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you're looking for does not exist or has been moved.
      </p>
      <Link to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
