import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../context/useAuth';

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-black via-gray-900 to-blue-900 font-sans text-white relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('/images/job-bg.jpg')] bg-cover bg-center opacity-10 z-0" />

      <div className="hidden lg:flex items-center justify-center w-1/2 z-10 p-10">
        <img
          src="/login.svg"
          alt="Career illustration"
          className="max-w-full max-h-[500px] object-contain"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 z-10 p-6 sm:p-10">
        <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md">
          <h2 className="text-4xl font-bold text-center mb-6 tracking-wide text-white">Login to View or Post Job</h2>
          
          {error && <p className="text-red-400 text-center mb-4 text-lg">{error}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-4 text-xl rounded-xl font-semibold shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-center text-white/70 mt-6 text-sm">
            Don’t have an account?{' '}
            <span className="underline cursor-pointer hover:text-blue-300" onClick={() => navigate('/register')}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
