import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Calendar, FileText } from "lucide-react";

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
            My Applications
          </h2>
          <p className="mt-5 text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Track your journey to elite opportunities with KaamKaro's application dashboard.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-10 flex justify-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title..."
            className="w-full md:w-2/3 lg:w-1/2 p-4 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-md"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-300 text-xl font-light">No applications found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((app) => (
              <div
                key={app._id}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-blue-500/30 hover:shadow-blue-600/50 hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{app.job?.title}</h3>
                <div className="text-sm text-gray-300 space-y-3">
                  <p className="flex items-center gap-3">
                    <Briefcase size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Company:</span> {app.job?.company}
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Location:</span> {app.job?.location?.city}
                  </p>
                  <p className="flex items-center gap-3">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Applied on:</span>{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold tracking-wide hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-blue-500/50"
                >
                  <FileText size={18} className="inline-block mr-2" />
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