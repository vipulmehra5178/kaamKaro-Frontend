import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../context/useAuth';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/applications/my`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setApplications(res.data);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    if (user?.role === 'candidate') fetchApplications();
  }, [user]);

  if (user?.role !== 'candidate') return <p className="text-center">Only candidates can view applications</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">My Applications</h2>
      {applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map(app => (
            <li key={app._id} className="p-4 border rounded shadow">
              <p><strong>Job:</strong> {app.job?.title}</p>
              <p><strong>Company:</strong> {app.job?.company}</p>
              <a
                href={app.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                View Resume
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
