import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApplyJobForm from '../components/ApplyJobForm';
import { Briefcase, MapPin, Currency, Star , FileText } from 'lucide-react';

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
      <div className="h-screen flex items-center justify-center text-gray-200 text-xl font-light">
        Loading job details...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-blue-900 to-gray-900 py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/images/luxury-pattern.png"
          alt="Luxury Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <div className="w-full bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-blue-500/30 transition-all duration-500 space-y-6">
          <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-xl text-center">
            {job.title}
          </h2>
          <div className="space-y-4 text-gray-200 text-base">
            <p className="flex items-center gap-3">
              <Briefcase size={20} className="text-blue-400" />
              <span className="font-semibold text-white">Company:</span> {job.company}
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={20} className="text-blue-400" />
              <span className="font-semibold text-white">Location:</span> {job.location?.city}, {job.location?.state}, {job.location?.country}
            </p>
            <p className="flex items-center gap-3">
              <Currency size={20} className="text-blue-400" />
              <span className="font-semibold text-white">Salary:</span> ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
            </p>
            <p className="flex items-center gap-3">
              <Star size={20} className="text-blue-400" />
              <span className="font-semibold text-white">Experience Required:</span> {job.experience}
            </p>
            <p className="flex items-center gap-3">
              <span className="font-semibold text-white">Skills Required:</span> {job.skills?.join(', ')}
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-lg font-semibold text-white flex items-center gap-3">
              <FileText size={20} className="text-blue-400" />
              Job Description
            </p>
            <p className="text-gray-200 leading-relaxed">{job.description}</p>
          </div>

          {alreadyApplied ? (
            <p className="text-blue-300 font-semibold mt-6 text-center">✅ You have already applied to this job.</p>
          ) : (
            <button
              onClick={() => setShowForm(!showForm)}
              className="mt-6 w-full sm:w-fit bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-8 py-3 rounded-xl font-semibold tracking-wide shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {showForm ? 'Fill Application Details' : 'Apply Now'}
            </button>
          )}
        </div>

        {showForm && (
          <div className="w-full max-w-4xl mt-12 animate-fade-in">
            <ApplyJobForm jobId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;