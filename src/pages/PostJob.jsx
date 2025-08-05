import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { Briefcase, MapPin, Currency, FileText, Clock } from 'lucide-react';

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
  }, [user, navigate]);

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
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/images/luxury-pattern.png"
          alt="Luxury Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-xl">
            Post a New Job
          </h2>
          <p className="mt-5 text-xl text-gray-200 max-w-xl mx-auto font-light leading-relaxed">
            Attract top talent with KaamKaro's premium job posting platform.
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-blue-500/30">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase size={24} className="text-blue-400" />
            <h3 className="text-2xl font-bold text-white tracking-tight">Job Posting Form</h3>
          </div>

          {error && <p className="text-red-400 text-center mb-6 text-lg font-light">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: 'title', placeholder: 'Job Title', icon: <Briefcase size={18} className="text-blue-400" /> },
              { name: 'company', placeholder: 'Company Name', icon: <Briefcase size={18} className="text-blue-400" /> },
              { name: 'city', placeholder: 'City', icon: <MapPin size={18} className="text-blue-400" /> },
              { name: 'state', placeholder: 'State', icon: <MapPin size={18} className="text-blue-400" /> },
              { name: 'country', placeholder: 'Country', icon: <MapPin size={18} className="text-blue-400" /> },
              { name: 'pinCode', placeholder: 'Pin Code', icon: <MapPin size={18} className="text-blue-400" /> },
              { name: 'minSalary', placeholder: 'Minimum Salary', icon: <Currency size={18} className="text-blue-400" /> },
              { name: 'maxSalary', placeholder: 'Maximum Salary', icon: <Currency size={18} className="text-blue-400" /> },
              { name: 'experience', placeholder: 'Experience (e.g. 1-3 years)', icon: <Clock size={18} className="text-blue-400" /> },
            ].map((field) => (
              <div key={field.name} className="relative">
                <input
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-10 py-3 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  required
                />
                <div className="absolute top-3 left-3">{field.icon}</div>
              </div>
            ))}
            <div className="relative">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Job Description"
                className="w-full px-10 py-3 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                rows="5"
                required
              />
              <FileText size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <div className="relative">
              <select
                name="employmentType"
                value={form.employmentType}
                onChange={handleChange}
                className="w-full px-10 py-3 bg-gray-800/80 text-white rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                required
              >
                <option className="bg-gray-800 text-white" value="Full-time">Full-time</option>
                <option className="bg-gray-800 text-white" value="Part-time">Part-time</option>
                <option className="bg-gray-800 text-white" value="Internship">Internship</option>
                <option className="bg-gray-800 text-white" value="Contract">Contract</option>
              </select>
              <Clock size={18} className="absolute top-3 left-3 text-blue-400" />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-3 rounded-xl font-semibold tracking-wide shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;