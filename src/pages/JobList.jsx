import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job._id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600">{job.company} - {job.location}</p>
              <Link to={`/jobs/${job._id}`}>
                <button className="mt-2 text-blue-600 hover:underline">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
