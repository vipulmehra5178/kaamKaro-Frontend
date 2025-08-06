import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Briefcase } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        form
      );
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-black via-blue-900 to-gray-900 text-white relative overflow-hidden">
      

      <div className="hidden lg:flex items-center justify-center w-1/2 z-10 p-10">
        <img
          src="/Sign.svg"
          alt="Register career"
          className="max-w-full max-h-[500px] object-contain drop-shadow-xl"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 z-10 p-6 sm:p-10">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-500/30">
          <h2 className="text-5xl font-extrabold text-center mb-8 tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-xl">
            Create Your Account
          </h2>

          {error && (
            <p className="text-red-400 text-center mb-6 text-lg font-light">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-10 py-3 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <User size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <div className="relative">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full px-10 py-3 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <Mail size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <div className="relative">
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full px-10 py-3 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <Lock size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-10 py-3 bg-gray-800/80 text-white rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 appearance-none"
              >
                <option className="bg-gray-800 text-white" value="candidate">
                  Candidate
                </option>
                <option className="bg-gray-800 text-white" value="employer">
                  Employer
                </option>
              </select>
              <Briefcase size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-200 mt-6 text-sm font-light">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer text-blue-400 hover:text-blue-300 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;