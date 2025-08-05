import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApplyJobForm from '../components/ApplyJobForm';
import { Briefcase, MapPin, Currency, Star } from 'lucide-react';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/jobs/${id}`);
        setJob(jobRes.data);
      } catch (err) {
        console.error('Failed to fetch job:', err);
      }
    };

    const checkIfApplied = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/applications/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const applied = res.data.some((app) => app.job?._id === id);
        setAlreadyApplied(applied);
      } catch (err) {
        console.error('Error checking existing applications:', err);
      }
    };

    fetchJob();
    checkIfApplied();
    setLoading(false);
  }, [id, token]);

  if (loading || !job) {
    return (
      <div className="h-screen flex items-center justify-center text-white text-xl">Loading job details...</div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] py-12 px-4 text-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="w-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20 transition-all duration-300 space-y-4">
          <h2 className="text-4xl font-extrabold text-cyan-400">{job.title}</h2>
          <p className="text-lg flex items-center gap-2"><Briefcase size={18} /> <strong>Company:</strong> {job.company}</p>
          <p className="flex items-center gap-2"><MapPin size={18} /> <strong>Location:</strong> {job.location?.city}, {job.location?.state}, {job.location?.country}</p>
          <p className="flex items-center gap-2"><Currency size={18} /> <strong>Salary:</strong> ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}</p>
          <p className="flex items-center gap-2"><Star size={18} /> <strong>Experience Required:</strong> {job.experience}</p>
          <p><strong>Skills Required:</strong> {job.skills?.join(', ')}</p>

          <div className="pt-2 space-y-2">
            <p className="text-lg font-semibold">📝 Job Description:</p>
            <p className="text-gray-300 leading-relaxed">{job.description}</p>
          </div>

          {alreadyApplied ? (
            <p className="text-green-400 font-semibold mt-4">✅ You have already applied to this job.</p>
          ) : (
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-6 w-fit bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {showForm ? "Fill the details below" : 'Apply Now'}
            </button>
          )}
        </div>

        {showForm && (
          <div className="w-full max-w-4xl mt-10 animate-fade-in">
            <ApplyJobForm jobId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
