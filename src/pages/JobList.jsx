import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Currency } from 'lucide-react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/jobs`);
        setJobs(res.data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Available Jobs</h2>
        {jobs.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No jobs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{job.title}</h3>
                <p className="text-gray-200 mb-1 flex items-center gap-2">
                  <Briefcase size={16} /> <span className="font-medium">Company:</span> {job.company}
                </p>
                <p className="text-gray-200 mb-1 flex items-center gap-2">
                  <MapPin size={16} /> <span className="font-medium">Location:</span> {job.location?.city}, {job.location?.state}, {job.location?.country}
                </p>
                <p className="text-gray-200 mb-1 flex items-center gap-2">
                  <Currency size={16} /> <span className="font-medium">Salary:</span> ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
                </p>
                <p className="text-gray-200 mb-3">
                  <span className="font-medium">Description:</span> {job.description.substring(0, 100)}...
                </p>
                <Link
                  to={`/jobs/${job._id}`}
                  className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;