import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Register = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Save additional user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        displayName: name,
        profileCompleted: false,
      });

      toast.success("Account created successfully!");
      navigate("/settings");
    } catch (error) {
      console.error("Registration Error:", error.message);
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h2 className="text-3xl font-bold mb-4 text-center">Create an Account</h2>
    <p className="text-gray-400 text-center mb-6">
    Enter your details to create your account
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
    <p className="block text-sm">Full Name</p>
    <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="MS Dhoni"
    className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
    />
    </div>

    <div>
    <p className="text-sm">Email</p>
    <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="example@gmail.com"
    className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
    />
    </div>

    <div>
    <p className="text-sm">Password</p>
    <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="******"
    className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
    />
    </div>

    <div>
    <p className="text-sm">Confirm Password</p>
    <input
    type="password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    placeholder="******"
    className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
    />
    </div>

    <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
    >
    Register
    </button>
    </form>

    <p className="text-center text-gray-400 mt-4">
    Already have an account?{" "}
    <Link to="/login" className="text-blue-500 hover:underline">
    Login
    </Link>
    </p>
    </div>
    </div>
  );
};

export default Register;
