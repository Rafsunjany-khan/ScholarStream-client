import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaUserShield, FaUserTie } from "react-icons/fa";

const UserManagement = ({ currentAdmin }) => {
  const [users, setUsers] = useState([]);
  const [adminExists, setAdminExists] = useState(false);
  const roles = ["Student", "Moderator", "Admin"];

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.users || []);
      const adminUser = res.data.users?.find((u) => u.role === "Admin");
      setAdminExists(!!adminUser);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userUid, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/users/update-role/${userUid}`, {
        role: newRole,
        requesterUid: currentAdmin.uid,
      });
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleMakeAdmin = async (userUid) => {
    try {
      await axios.put(`http://localhost:5000/api/users/make-admin/${userUid}`);
      toast.success("You are now Admin!");
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to make Admin");
    }
  };


  const renderRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return (
          <span className="flex items-center justify-center gap-1 text-red-600 font-semibold">
            <FaUserShield /> {role}
          </span>
        );
      case "Moderator":
        return (
          <span className="flex items-center justify-center gap-1 text-yellow-600 font-semibold">
            <FaUserTie /> {role}
          </span>
        );
      default:
        return (
          <span className="flex items-center justify-center gap-1 text-blue-600 font-semibold">
            <FaUser /> {role}
          </span>
        );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">User Management</h2>
      <table className="table w-full bg-white shadow-lg border rounded-lg text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid} className="hover:bg-gray-100">
              <td className="py-2">
                <img src={user.photoURL || "https://via.placeholder.com/40"} alt={user.name}
                  className="w-10 h-10 rounded-full mx-auto" />
              </td>
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{renderRoleIcon(user.role)}</td>
              <td className="py-2">
                {!adminExists && user.role === "Student" && (
                  <button
                    onClick={() => handleMakeAdmin(user.uid)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2" >
                    Make Admin
                  </button>
                )}
                {currentAdmin?.role === "Admin" && (
                  <select value={user.role}
                    onChange={(e) => handleRoleChange(user.uid, e.target.value)}
                    className="border px-2 py-1 rounded" >
                    {roles.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption}
                      </option>
                    ))}
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
