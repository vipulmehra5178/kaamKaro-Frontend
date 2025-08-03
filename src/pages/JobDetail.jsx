import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApplyJobForm from '../components/ApplyJobForm';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to fetch job details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <p className="text-center text-gray-300 mt-10">Loading job details...</p>;
  if (!job) return <p className="text-center text-red-400 mt-10">Job not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">{job.title}</h1>

        <div className="space-y-3 text-gray-300 mb-8">
          <p><span className="font-semibold text-white">Company:</span> {job.company}</p>
          <p><span className="font-semibold text-white">Location:</span> {job.location}</p>
          <p><span className="font-semibold text-white">Job Type:</span> {job.jobType || 'N/A'}</p>
          <p><span className="font-semibold text-white">Posted On:</span> {new Date(job.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-300 mb-2">Job Description</h2>
          <p className="text-gray-200 leading-relaxed whitespace-pre-line">{job.description}</p>
        </div>

        {user?.role === 'candidate' && (
          <div>
            <h2 className="text-xl font-semibold text-blue-300 mb-4">Apply for this job</h2>
            <ApplyJobForm jobId={job._id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetailPage;
