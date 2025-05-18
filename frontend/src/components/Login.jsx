import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      toast.success("Login successful!", { position: "top-center" });
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      toast.error("Login failed. Please check your email or password.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
    <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Login</h2>
    <p className="text-gray-400 text-sm sm:text-base text-center mb-6">
    Enter your details to Login
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
    <label className="block text-sm mb-1">Email</label>
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
    <label className="block text-sm mb-1">Password</label>
    <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="******"
    className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
    />
    </div>

    <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
    >
    Login
    </button>
    </form>

    <p className="text-center text-gray-400 text-sm mt-4">
    Don’t have an account?{" "}
    <Link to="/Register" className="text-blue-500 hover:underline">
    Register
    </Link>
    </p>
    </div>
    </div>
  );
};

export default Login;
