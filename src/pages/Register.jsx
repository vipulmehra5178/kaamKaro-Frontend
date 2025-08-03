import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/job-bg.jpg')] bg-cover bg-center opacity-10 z-0" />

      <div className="hidden lg:flex items-center justify-center w-1/2 z-10 p-10">
        <img
          src="/Sign.svg"
          alt="Register career"
          className="max-w-full max-h-[500px] object-contain"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 z-10 p-6 sm:p-10">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-6 text-white">
            Create Your Account
          </h2>

          {error && (
            <p className="text-red-400 text-center mb-4 text-lg">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option className="bg-gray-800 text-white" value="candidate">
                Candidate
              </option>
              <option className="bg-gray-800 text-white" value="employer">
                Employer
              </option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-4 text-xl rounded-xl font-semibold shadow-md"
            >
              Register
            </button>
          </form>

          <p className="text-center text-white/70 mt-6 text-sm">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer hover:text-blue-300"
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
