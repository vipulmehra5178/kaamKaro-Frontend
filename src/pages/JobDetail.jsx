import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApplyJobForm from '../components/ApplyJobForm';
import { Briefcase, MapPin, Currency, Star, FileText } from 'lucide-react';

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
          headers: { Authorization: `Bearer ${token}` },
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
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-8 lg:px-20 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-zinc-900 border border-blue-900 shadow-2xl rounded-3xl p-10 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent text-center lg:text-left">
              {job.title}
            </h1>

            <div className="space-y-4 text-gray-300 text-base">
              <p className="flex items-center gap-3">
                <Briefcase className="text-blue-400" size={20} />
                <span className="font-semibold text-white">Company:</span> {job.company}
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="text-blue-400" size={20} />
                <span className="font-semibold text-white">Location:</span> {job.location?.city}, {job.location?.state}, {job.location?.country}
              </p>
              <p className="flex items-center gap-3">
                <Currency className="text-blue-400" size={20} />
                <span className="font-semibold text-white">Salary:</span> ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
              </p>
              <p className="flex items-center gap-3">
                <Star className="text-blue-400" size={20} />
                <span className="font-semibold text-white">Experience:</span> {job.experience}
              </p>
              <p className="flex gap-2 flex-wrap">
                <span className="font-semibold text-white">Skills:</span>
                {job.skills?.map((skill, i) => (
                  <span key={i} className="bg-blue-800 text-white text-sm px-2 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-lg font-semibold text-white flex items-center gap-3">
                <FileText size={20} className="text-blue-400" />
                Job Description
              </p>
              <p className="text-gray-300 leading-relaxed">{job.description}</p>
            </div>

            {alreadyApplied ? (
              <p className="text-blue-400 font-semibold mt-6 text-center">
                ✅ You’ve already applied to this job.
              </p>
            ) : (
              <button
                onClick={() => setShowForm(!showForm)}
                className="cursor-pointer mt-6 w-full sm:w-fit bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300 hover:scale-105"
              >
                {showForm ? "Please fill the details below" : 'Apply Now'}
              </button>
            )}
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <img src="/jobs.svg" alt="Apply Illustration" className="w-full max-w-md" />
          </div>
        </div>

        {showForm && (
          <div className="mt-10">
            <ApplyJobForm jobId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
