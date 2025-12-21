import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllScholarships = ({ currentUser }) => {
  const [scholarships, setScholarships] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const { data } = await axios.get("https://scholarstream.onrender.com/api/scholarships");
        setScholarships(data.data);
        setFiltered(data.data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch scholarships");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("https://scholarstream.onrender.com/api/scholarships/categories");
        if (data?.data && Array.isArray(data.data)) setCategories(data.data);
      } catch {
        toast.error("Failed to load scholarship categories");
      }
    };

    const fetchSubjects = async () => {
      try {
        const { data } = await axios.get("https://scholarstream.onrender.com/api/scholarships/subjects");
        if (data?.data && Array.isArray(data.data)) setSubjects(data.data);
      } catch {
        toast.error("Failed to load subject categories");
      }
    };

    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("https://scholarstream.onrender.com/api/scholarships/countries");
        if (data?.data && Array.isArray(data.data)) setCountries(data.data);
      } catch {
        toast.error("Failed to load countries");
      }
    };

    fetchScholarships();
    fetchCategories();
    fetchSubjects();
    fetchCountries();
  }, []);

  useEffect(() => {
    let result = scholarships;

    if (search.trim() !== "") {
      result = result.filter(
        (item) =>
          item.scholarshipName.toLowerCase().includes(search.toLowerCase()) ||
          item.universityName.toLowerCase().includes(search.toLowerCase()) ||
          item.degree.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterCategory) {
      result = result.filter(
        (item) => item.scholarshipCategory.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    if (filterSubject) {
      result = result.filter(
        (item) => item.subjectCategory.toLowerCase() === filterSubject.toLowerCase()
      );
    }

    if (filterLocation) {
      result = result.filter(
        (item) => item.universityCountry.toLowerCase() === filterLocation.toLowerCase()
      );
    }

    setFiltered(result);
  }, [search, filterCategory, filterSubject, filterLocation, scholarships]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading Scholarships...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Scholarships</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder="Search by Scholarship / University / Degree" value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded px-4 py-2"/>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded px-4 py-2">
          <option value="">Scholarship Category</option>
          {categories.length > 0
            ? categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)
            : <option disabled>Loading categories...</option>}
        </select>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="border rounded px-4 py-2">
          <option value="">Subject Category</option>
          {subjects.length > 0
            ? subjects.map((sub) => <option key={sub} value={sub}>{sub}</option>)
            : <option disabled>Loading subjects...</option>}
        </select>

        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="border rounded px-4 py-2">
          <option value="">Location (Country)</option>
          {countries.length > 0
            ? countries.map((country) => <option key={country} value={country}>{country}</option>)
            : <option disabled>Loading countries...</option>}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600">No scholarships found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((scholarship) => (
            <div key={scholarship._id} className="bg-white shadow rounded p-4 flex flex-col">
              <img src={scholarship.universityImage} alt={scholarship.universityName}
                className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold mb-1">{scholarship.universityName}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Scholarship:</span> {scholarship.scholarshipCategory}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Location:</span> {scholarship.universityCity}, {scholarship.universityCountry}
              </p>
              {scholarship.applicationFees && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Application Fees:</span> ${scholarship.applicationFees}
                </p>
              )}
              <button
                onClick={() => navigate(`/scholarship/${scholarship._id}`)}
                className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllScholarships;
