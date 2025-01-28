import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import decodeToken from "../../../utils/jwtdecode";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    return email !== "" && password !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in both fields.");
      return;
    }

    setIsLoading(true);

    try {
      const token=localStorage.getItem("token");
      console.log(token);
   
      const response = await axios.post("http://localhost:8000/api/admin/login", {
        email,
        password,
      }, {
        headers: {
          'database': "superadmin" 
    }});

      if (response.status === 200) {
        console.log(response.data.token)
        toast.success("Login successful!");
        localStorage.setItem("token",response.data.token)
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Email does not exist.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid credentials.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="form-checkbox text-blue-500 mr-2" />
              Remember me
            </label>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account? <a href="#" className="text-blue-500 font-medium hover:underline">Sign up</a>
        </p>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
