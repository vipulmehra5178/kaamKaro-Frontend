import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Mail, Calendar, BookOpen, Code, Link as LinkIcon } from "lucide-react";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [visibleResumes, setVisibleResumes] = useState({});
  const [searchSkill, setSearchSkill] = useState("");
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/applications/job/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch job applications.");
        }

        const data = await res.json();
        setApplications(data);
        setFilteredApps(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job applications:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  useEffect(() => {
    if (!searchSkill) {
      setFilteredApps(applications);
    } else {
      const filtered = applications.filter((app) =>
        app.skills?.some((skill) =>
          skill.toLowerCase().includes(searchSkill.toLowerCase())
        )
      );
      setFilteredApps(filtered);
      setCurrentPage(1);
    }
  }, [searchSkill, applications]);

  const toggleResume = (id) => {
    setVisibleResumes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);

  if (loading) return <p className="text-center text-gray-200 text-xl font-light">Loading...</p>;
  if (error) return <p className="text-center text-red-400 text-xl font-light">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-400 to-blue-200 bg-clip-text text-transparent drop-shadow-xl">
            Job Applications
          </h2>
          <p className="mt-5 text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Review top-tier candidates for your opportunity with KaamKaro's curated application portal.
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <input
            type="text"
            placeholder="Search by skill..."
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            className="w-full md:w-2/3 lg:w-1/2 p-4 bg-gray-800/80 text-white placeholder-gray-400 rounded-xl border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-md"
          />
        </div>

        {filteredApps.length === 0 ? (
          <p className="text-center text-gray-300 text-xl font-light">No applications found.</p>
        ) : (
          <div className="grid gap-10">
            {paginatedApps.map((app) => (
              <div
                key={app._id}
                className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md border border-blue-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-600/50 hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {app.candidate?.name}
                </h3>

                <div className="text-sm text-gray-300 space-y-4 mb-6">
                  <p className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Email:</span> {app.candidate?.email}
                  </p>
                  <p className="flex items-center gap-3">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Applied on:</span>{" "}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-3">
                    <Briefcase size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Experience:</span> {app.experience}
                  </p>
                  <p className="flex items-center gap-3">
                    <Code size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Skills:</span> {app.skills?.join(", ")}
                  </p>
                  <p className="flex items-center gap-3">
                    <BookOpen size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Education:</span>{" "}
                    {app.education?.degree}, {app.education?.institution} ({app.education?.yearOfCompletion})
                  </p>
                  <p className="flex items-center gap-3">
                    <LinkIcon size={18} className="text-blue-400" />
                    <span className="text-white font-semibold">Portfolio:</span>{" "}
                    {app.portfolioLinks?.map((link, idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline mr-2 hover:text-blue-300 transition"
                      >
                        {link}
                      </a>
                    ))}
                  </p>
                  <p className="text-gray-200">
                    <span className="text-white font-semibold">Cover Letter:</span> {app.coverLetter}
                  </p>
                </div>

                <button
                  onClick={() => toggleResume(app._id)}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold tracking-wide hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-blue-500/50"
                >
                  {visibleResumes[app._id] ? "Hide Resume" : "View Resume"}
                </button>

                {visibleResumes[app._id] && (
                  <div className="mt-6">
                    <iframe
                      src={app.resumeUrl}
                      title={`Resume of ${app.candidate?.name}`}
                      className="w-full h-96 border border-blue-500/30 rounded-xl shadow-inner"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback = document.getElementById(`fallback-${app._id}`);
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline block mt-3 text-sm hover:text-blue-300 transition"
                      id={`fallback-${app._id}`}
                      style={{ display: "none" }}
                    >
                      Download Resume (Fallback)
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold tracking-wide disabled:opacity-50 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-blue-500/50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold tracking-wide disabled:opacity-50 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-md hover:shadow-blue-500/50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;