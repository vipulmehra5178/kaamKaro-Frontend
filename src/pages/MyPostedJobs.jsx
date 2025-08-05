import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/jobs/my-jobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected server response");
        }

        setJobs(data);
        setFiltered(data);
      } catch (err) {
        console.error("Error fetching posted jobs:", err.message);
        setError("Failed to fetch jobs");
        setJobs([]);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered(jobs);
    } else {
      const term = searchTerm.toLowerCase();
      const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(term)
      );
      setFiltered(filteredJobs);
    }
  }, [searchTerm, jobs]);

  if (loading) return <p className="text-center text-white text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-400 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">My Posted Jobs</h2>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 p-3 w-full bg-white/20 text-white placeholder-gray-300 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {filtered.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No jobs found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <div
                key={job._id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-cyan-400">{job.title}</h3>
                <p className="text-gray-200">Company: {job.company}</p>
                <p className="text-gray-200">
                  Location: {job.location?.city}, {job.location?.state}, {job.location?.country}
                </p>
                <p className="text-gray-200">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
                <Link
                  to={`/employer/job/${job._id}/applications`}
                  className="text-cyan-400 underline mt-2 inline-block hover:text-cyan-300"
                >
                  View Applicants
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostedJobs;