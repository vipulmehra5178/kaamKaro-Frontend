import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/applications/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch applications");

        const data = await res.json();
        setApplications(data);
        setFiltered(data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  useEffect(() => {
    if (!search) return setFiltered(applications);

    const f = applications.filter((app) =>
      app.job?.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
  }, [search, applications]);

  if (loading) return <p className="text-center text-white text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-400 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">My Applications</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by job title..."
          className="mb-6 p-3 w-full bg-white/20 text-white placeholder-gray-300 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {filtered.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No applications found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <div
                key={app._id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-cyan-400">{app.job?.title}</h3>
                <p className="text-gray-200">Company: {app.job?.company}</p>
                <p className="text-gray-200">Location: {app.job?.location?.city}</p>
                <p className="text-gray-200">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                <Link
                  to={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline mt-2 inline-block hover:text-cyan-300"
                >
                  View Resume
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;