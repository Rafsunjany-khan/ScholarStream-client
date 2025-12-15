import React, { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = ({ currentUser }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/applications/user/${currentUser.email}`)
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentUser]);

  if (loading) return <p className="text-center mt-10">Loading applications...</p>;
  if (applications.length === 0)
    return <p className="text-center mt-10">No applications found.</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="py-2 px-4 border">University Name</th>
            <th className="py-2 px-4 border">University Address</th>
            <th className="py-2 px-4 border">Subject Category</th>
            <th className="py-2 px-4 border">Application Fees</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Feedback</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app._id} className="text-center text-sm">
              <td className="py-2 px-4 border">
                {app.scholarshipDetails?.universityName || app.universityName}
              </td>
              <td className="py-2 px-4 border">
                {app.scholarshipDetails
                  ? `${app.scholarshipDetails.universityCity}, ${app.scholarshipDetails.universityCountry}`
                  : "-"}
              </td>
              <td className="py-2 px-4 border">
                {app.scholarshipDetails?.subjectCategory || "-"}
              </td>
              <td className="py-2 px-4 border">${app.applicationFees}</td>
              <td className="py-2 px-4 border capitalize">{app.applicationStatus}</td>
              <td className="py-2 px-4 border">{app.feedback || "-"}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => setSelectedApp(app)}
                  className="px-3 py-1 bg-blue-500 text-white rounded">
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedApp.scholarshipDetails ? (
              <>
                <img src={selectedApp.scholarshipDetails.universityImage} alt="University"
                  className="w-24 mx-auto mb-4"/>
                <h3 className="text-xl font-bold text-center mb-3">
                  {selectedApp.scholarshipDetails.scholarshipName}
                </h3>
                <p>
                  <strong>University:</strong>{" "}
                  {selectedApp.scholarshipDetails.universityName}
                </p>
                <p>
                  <strong>Location:</strong>{" "}
                  {selectedApp.scholarshipDetails.universityCity},{" "}
                  {selectedApp.scholarshipDetails.universityCountry}
                </p>
                <p>
                  <strong>World Rank:</strong>{" "}
                  {selectedApp.scholarshipDetails.universityWorldRank}
                </p>
                <p>
                  <strong>Subject:</strong>{" "}
                  {selectedApp.scholarshipDetails.subjectCategory}
                </p>
                <p>
                  <strong>Degree:</strong> {selectedApp.degree}
                </p>
                <p>
                  <strong>Scholarship Type:</strong>{" "}
                  {selectedApp.scholarshipDetails.scholarshipCategory}
                </p>
                <p>
                  <strong>Tuition Fees:</strong>{" "}
                  ${selectedApp.scholarshipDetails.tuitionFees}
                </p>
                <p>
                  <strong>Application Fees:</strong> ${selectedApp.applicationFees}
                </p>
                <p>
                  <strong>Service Charge:</strong> ${selectedApp.serviceCharge}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {selectedApp.scholarshipDetails.applicationDeadline}
                </p>
                <p>
                  <strong>Status:</strong> {selectedApp.applicationStatus}
                </p>
                <p>
                  <strong>Feedback:</strong> {selectedApp.feedback || "N/A"}
                </p>
              </>
            ) : (
              <p>No scholarship details found.</p>
            )}

            <button
              onClick={() => setSelectedApp(null)}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
