import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    company: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    description: '',
    minSalary: '',
    maxSalary: '',
    experience: '',
    employmentType: 'Full-time'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'employer') {
      navigate('/login');
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: form.title,
        company: form.company,
        location: {
          city: form.city,
          state: form.state,
          country: form.country,
          pinCode: form.pinCode,
        },
        description: form.description,
        salary: {
          min: Number(form.minSalary),
          max: Number(form.maxSalary)
        },
        experience: form.experience,
        employmentType: form.employmentType
      };

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/jobs`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('✅ Job posted successfully');
      navigate('/jobs');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to post job');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
        <h2 className="text-4xl font-bold text-center text-white mb-6">Post a Job</h2>
        {error && <p className="text-red-400 text-center mb-4 text-lg">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: 'title', placeholder: 'Job Title' },
            { name: 'company', placeholder: 'Company Name' },
            { name: 'city', placeholder: 'City' },
            { name: 'state', placeholder: 'State' },
            { name: 'country', placeholder: 'Country' },
            { name: 'pinCode', placeholder: 'Pin Code' },
            { name: 'minSalary', placeholder: 'Minimum Salary' },
            { name: 'maxSalary', placeholder: 'Maximum Salary' },
            { name: 'experience', placeholder: 'Experience (e.g. 1-3 years)' },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
              required
            />
          ))}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
            rows="4"
            required
          />
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-white/20"
            required
          >
            <option className="bg-gray-800 text-white" value="Full-time">Full-time</option>
            <option className="bg-gray-800 text-white" value="Part-time">Part-time</option>
            <option className="bg-gray-800 text-white" value="Internship">Internship</option>
            <option className="bg-gray-800 text-white" value="Contract">Contract</option>
          </select>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-4 text-xl rounded-xl font-semibold shadow-md transition-all transform hover:scale-105"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;