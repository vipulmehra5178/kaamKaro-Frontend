import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import { Briefcase, MapPin, Currency, FileText, Clock } from 'lucide-react';

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', company: '', city: '', state: '', country: '', pinCode: '',
    description: '', minSalary: '', maxSalary: '', experience: '', employmentType: 'Full-time'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'employer') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/jobs`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Congrats , Job posted successfully');
      navigate('/jobs');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to post job');
    }
  };

  const fields = [
    { name: 'title', placeholder: 'Job Title', icon: Briefcase },
    { name: 'company', placeholder: 'Company Name', icon: Briefcase },
    { name: 'city', placeholder: 'City', icon: MapPin },
    { name: 'state', placeholder: 'State', icon: MapPin },
    { name: 'country', placeholder: 'Country', icon: MapPin },
    { name: 'pinCode', placeholder: 'Pin Code', icon: MapPin },
    { name: 'minSalary', placeholder: 'Minimum Salary', icon: Currency },
    { name: 'maxSalary', placeholder: 'Maximum Salary', icon: Currency },
    { name: 'experience', placeholder: 'Experience (e.g. 1-3 years)', icon: Clock },
  ];

  return (
    <div className="min-h-screen px-6 py-12 md:px-16 bg-[#0f172a] text-white">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-white">Post a New Job</h1>
        <p className="text-gray-400 mt-2 text-base leading-relaxed">
          Attract top talent with KaamKaro's premium job posting platform.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        <div className="w-full h-full">
          <img
            src="/cv.svg"
            alt="Recruiter Illustration"
            className="w-full h-full object-contain rounded-2xl shadow-xl"
          />
        </div>

        <div className="w-full space-y-10">
          <div className="bg-[#1e293b] border border-gray-700 rounded-2xl shadow-sm p-8 space-y-8">
            <div className="flex items-center gap-3">
              <Briefcase className="text-blue-400" size={22} />
              <h2 className="text-xl font-semibold tracking-tight text-white">Job Posting Form</h2>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center border border-red-300 bg-red-900 bg-opacity-30 p-2 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map(({ name, placeholder, icon: Icon }) => (
                <div key={name} className="relative">
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full px-10 py-2.5 rounded-xl border border-gray-600 bg-[#0f172a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <Icon className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              ))}

              <div className="relative">
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Job Description"
                  rows="5"
                  className="w-full px-10 py-2.5 rounded-xl border border-gray-600 bg-[#0f172a] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <FileText className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              <div className="relative">
                <select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                  className="w-full px-10 py-2.5 rounded-xl border border-gray-600 bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Full-time', 'Part-time', 'Internship', 'Contract'].map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all"
              >
                Post Job
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
