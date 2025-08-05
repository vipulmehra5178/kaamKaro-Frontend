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
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/images/luxury-pattern.png"
          alt="Luxury Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-400 to-blue-200 bg-clip-text text-transparent drop-shadow-xl">
            Discover Elite Opportunities
          </h2>
          <p className="mt-5 text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Embark on a journey to exceptional careers with KaamKaro's curated, premium job listings.
          </p>
        </div>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-300 text-xl font-light">No opportunities available at the moment. Explore again soon!</p>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md border border-blue-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-600/50 hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {job.title}
                </h3>

                <div className="text-sm text-gray-300 space-y-3 mb-6">
                  <p className="flex items-center gap-3">
                    <Briefcase size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Company:</span> {job.company}
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Location:</span>{' '}
                    {job.location?.city}, {job.location?.state}, {job.location?.country}
                  </p>
                  <p className="flex items-center gap-3">
                    <Currency size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Salary:</span>{' '}
                    ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
                  </p>
                </div>

                <p className="text-gray-200 text-sm mb-6 line-clamp-3">
                  <span className="text-white font-semibold">Description:</span> {job.description}
                </p>

                <Link
                  to={`/jobs/${job._id}`}
                  className="inline-block w-full text-center py-3 rounded-xl font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white transition-all duration-300 shadow-md hover:shadow-blue-500/50"
                >
                  Explore Opportunity
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