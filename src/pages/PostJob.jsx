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
    location: '',
    description: '',
    requirements: ''
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
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/jobs`, form, {
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
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className="input" required />
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="input" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="input" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description" className="input" rows="3" required />
        <textarea name="requirements" value={form.requirements} onChange={handleChange} placeholder="Requirements" className="input" rows="2" required />

        <button type="submit" className="btn">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
