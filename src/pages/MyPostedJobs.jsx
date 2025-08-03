import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

const MyPostedJobs = () => {
  const { user } = useAuth();
  const [jobsPosted, setJobsPosted] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/jobs/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobsPosted(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    if (user?.role === 'employer') fetchJobs();
  }, [user]);

  if (user?.role !== 'employer') return <p className="text-center">Only employers can view posted jobs</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Posted Jobs</h2>
      {jobsPosted.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t posted any jobs yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobsPosted.map(job => (
            <li key={job._id} className="p-4 border rounded shadow">
              <p className="font-semibold">{job.title}</p>
              <p className="text-gray-600">{job.company} - {job.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPostedJobs;
