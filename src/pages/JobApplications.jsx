import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (loading) return <p className="text-center text-white text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-400 text-lg">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Applications for this Job</h2>
        <input
          type="text"
          placeholder="Filter by skill..."
          value={searchSkill}
          onChange={(e) => setSearchSkill(e.target.value)}
          className="mb-6 p-3 w-full md:w-1/2 bg-white/20 text-white placeholder-gray-300 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        {filteredApps.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No applications found.</p>
        ) : (
          <div className="grid gap-6">
            {paginatedApps.map((app) => (
              <div
                key={app._id}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <h3 className="text-xl font-bold text-cyan-400">{app.candidate?.name}</h3>
                <p className="text-gray-200">Email: {app.candidate?.email}</p>
                <p className="text-gray-200">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-200"><strong>Experience:</strong> {app.experience}</p>
                <p className="text-gray-200"><strong>Skills:</strong> {app.skills?.join(", ")}</p>
                <p className="text-gray-200"><strong>Education:</strong> {app.education?.degree}, {app.education?.institution} ({app.education?.yearOfCompletion})</p>
                <p className="text-gray-200">
                  <strong>Portfolio:</strong>{" "}
                  {app.portfolioLinks?.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 underline mr-2 hover:text-cyan-300"
                    >
                      {link}
                    </a>
                  ))}
                </p>
                <p className="text-gray-200"><strong>Cover Letter:</strong> {app.coverLetter}</p>
                <button
                  onClick={() => toggleResume(app._id)}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full hover:from-cyan-700 hover:to-blue-700 transition-all"
                >
                  {visibleResumes[app._id] ? "Hide Resume" : "View Resume"}
                </button>
                {visibleResumes[app._id] && (
                  <div className="mt-4">
                    <iframe
                      src={app.resumeUrl}
                      title={`Resume of ${app.candidate?.name}`}
                      className="w-full h-96 border rounded-xl"
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
                      className="text-cyan-400 underline block mt-2"
                      id={`fallback-${app._id}`}
                      style={{ display: "none" }}
                    >
                      Download Resume (fallback)
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full disabled:opacity-50 hover:from-cyan-700 hover:to-blue-700 transition-all"
            >
              Previous
            </button>
            <span className="text-lg font-semibold text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full disabled:opacity-50 hover:from-cyan-700 hover:to-blue-700 transition-all"
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