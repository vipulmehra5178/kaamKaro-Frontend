import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Calendar, Users } from "lucide-react";

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

  if (loading) return <p className="text-center text-gray-200 text-xl font-light">Loading...</p>;
  if (error) return <p className="text-center text-red-400 text-xl font-light">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/images/luxury-pattern.png"
          alt="Luxury Background Pattern"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-xl">
            My Posted Jobs
          </h2>
          <p className="mt-5 text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Manage your elite job postings and review applicants with KaamKaro's premium dashboard.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 p-4 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-md"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-300 text-xl font-light">No jobs found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((job) => (
              <div
                key={job._id}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-blue-500/30 hover:shadow-blue-600/50 hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{job.title}</h3>
                <div className="text-sm text-gray-300 space-y-3">
                  <p className="flex items-center gap-3">
                    <Briefcase size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Company:</span> {job.company}
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Location:</span> {job.location?.city}, {job.location?.state}, {job.location?.country}
                  </p>
                  <p className="flex items-center gap-3">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Posted on:</span>{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/employer/job/${job._id}/applications`}
                  className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold tracking-wide hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-blue-500/50"
                >
                  <Users size={18} className="inline-block mr-2" />
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