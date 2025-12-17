import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const capitalLetter = /[A-Z]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    if (!minLength.test(password)) return "Password must be at least 6 characters";
    if (!capitalLetter.test(password)) return "Password must include at least one capital letter";
    if (!specialChar.test(password)) return "Password must include at least one special character";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name, photoURL: photoURL });

      await axios.post("https://scholarstream.onrender.com/api/users/register", {
        uid: user.uid,
        name,
        email,
        photoURL,
        role: "Student",
      });

      toast.success(`Welcome ${user.displayName}! Account created successfully!`);

      setName("");
      setEmail("");
      setPhotoURL("");
      setPassword("");

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input type="text" placeholder="Name" value={name}
            onChange={(e) => setName(e.target.value)} required
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Photo URL" value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)} required
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
          <button type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 font-semibold" >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
