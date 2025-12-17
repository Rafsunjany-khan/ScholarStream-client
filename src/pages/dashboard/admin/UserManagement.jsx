import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaUserShield, FaUserTie, FaTrash } from "react-icons/fa";

const UserManagement = ({ currentAdmin }) => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("All");
  const [deleteUser, setDeleteUser] = useState(null);

  const roles = ["Student", "Moderator", "Admin"];

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://scholarstream.onrender.com/api/users");
      setUsers(res.data.users || []);
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
      await axios.put(
        `https://scholarstream.onrender.com/api/users/update-role/${userUid}`,
        {
          role: newRole,
          adminUid: currentAdmin.uid,
        }
      );
      toast.success("Role updated successfully");
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(
       `https://scholarstream.onrender.com/api/users/${deleteUser.uid}?adminUid=${currentAdmin.uid}`
       );

      toast.success("User deleted successfully");
      setDeleteUser(null);
      fetchUsers();
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to delete user");
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

  const filteredUsers =
    filterRole === "All"
      ? users
      : users.filter((user) => user.role === filterRole);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">User Management</h2>
      <div className="flex justify-end mb-4">
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-3 py-2 rounded">
          <option value="All">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <table className="table w-full bg-white shadow-lg border rounded-lg text-center">
        <thead className="bg-gray-200">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.uid} className="hover:bg-gray-100">
              <td>
                <img src={user.photoURL || "https://via.placeholder.com/40"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full mx-auto"/>
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{renderRoleIcon(user.role)}</td>

              <td>
                {currentAdmin?.role === "Admin" && (
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.uid, e.target.value)
                    }
                    className="border px-2 py-1 rounded">
                    {roles.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption}
                      </option>
                    ))}
                  </select>
                )}
              </td>

              <td>
                {currentAdmin?.role === "Admin" && (
                  <button
                    onClick={() => setDeleteUser(user)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1 mx-auto">
                    <FaTrash /> Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
            <h3 className="text-xl font-bold mb-4">
              Are you sure you want to delete
              <br />
              <span className="text-red-600">{deleteUser.name}</span>?
            </h3>
            <p className="text-gray-600 mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteUser}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                Yes, Delete
              </button>
              <button
                onClick={() => setDeleteUser(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
