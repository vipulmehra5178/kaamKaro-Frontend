import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../context/useAuth';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, form);
      login(res.data.user, res.data.token);

      if (res.data.user.role === 'employer') {
        navigate('/my-posted-jobs');
      } else {
        navigate('/jobs');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-black via-blue-900 to-gray-900 font-sans text-white relative overflow-hidden">
      

      <div className="hidden lg:flex items-center justify-center w-1/2 z-10 p-10">
        <img
          src="/login.svg"
          alt="Career illustration"
          className="max-w-full max-h-[500px] object-contain drop-shadow-xl"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 z-10 p-6 sm:p-10">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-500/30">
          <h2 className="text-5xl font-extrabold text-center mb-8 tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-xl">
            Login to KaamKaro
          </h2>

          {error && <p className="text-red-400 text-center mb-6 text-lg font-light">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-10 py-3 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                required
              />
              <Mail size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <div className="relative">
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                className="w-full px-10 py-3 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                required
              />
              <Lock size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-200 mt-6 text-sm font-light">
            Don’t have an account?{' '}
            <span
              className="underline cursor-pointer text-blue-400 hover:text-blue-300 transition"
              onClick={() => navigate('/register')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;