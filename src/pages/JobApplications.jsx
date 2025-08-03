import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/applications/${jobId}/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) return <p className="text-center">Loading applications...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Applications for this Job</h2>
      {applications.length === 0 ? (
        <p>No applications received yet.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app._id} className="border p-4 rounded shadow">
              <p><strong>Candidate:</strong> {app.candidate.name} ({app.candidate.email})</p>
              <a href={app.resumeUrl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobApplications;
