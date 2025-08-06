import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Currency } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white px-6 py-12 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-400 to-blue-700 bg-clip-text text-transparent drop-shadow-xl">
              Discover Elite Opportunities
            </h2>
            <p className="text-gray-400 max-w-xl text-base sm:text-lg">
              Embark on a journey to exceptional careers with KaamKaro's curated, premium job listings.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="/find.svg"
              alt="Job hunt"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
            />
          </div>
        </div>

        {jobs.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No opportunities available at the moment. Explore again soon!
          </p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-gray-800/90 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-blue-800/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    <Badge variant="secondary" className="bg-blue-700/30 text-blue-300">
                      {job.jobType || 'Full-Time'}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-300 space-y-2 mb-4">
                    <p className="flex items-center gap-2">
                      <Briefcase size={16} className="text-blue-400" />
                      <span className="text-white font-medium">Company:</span> {job.company}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="text-blue-400" />
                      <span className="text-white font-medium">Location:</span> {job.location?.city}, {job.location?.state}
                    </p>
                    <p className="flex items-center gap-2">
                      <Currency size={16} className="text-blue-400" />
                      <span className="text-white font-medium">Salary:</span> ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
                    </p>
                  </div>

                  <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                    <span className="text-white font-medium">Description:</span> {job.description}
                  </p>
                </div>

                <Link
                  to={`/jobs/${job._id}`}
                  className="block text-center py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
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
