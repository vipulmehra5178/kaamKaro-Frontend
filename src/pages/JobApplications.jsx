import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const JobApplications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleResumes, setVisibleResumes] = useState({});

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicationsAndJob = async () => {
      try {
        const [appsRes, jobRes] = await Promise.all([
          fetch(`${API_BASE}/api/applications/job/${jobId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE}/api/jobs/${jobId}`),
        ]);

        const appsData = await appsRes.json();
        const jobData = await jobRes.json();

        setApplications(appsData);
        setFilteredApps(appsData);
        setJob(jobData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job or applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationsAndJob();
  }, [jobId]);

  useEffect(() => {
    if (!searchSkill.trim()) {
      setFilteredApps(applications);
      return;
    }

    const term = searchSkill.toLowerCase();

    const filtered = applications.filter((app) => {
      const candidate = app.candidate || {};
      const education = app.education || {};

      return (
        candidate.name?.toLowerCase().includes(term) ||
        candidate.email?.toLowerCase().includes(term) ||
        candidate.phone?.toLowerCase().includes(term) ||
        app.experience?.toString().toLowerCase().includes(term) ||
        app.skills?.some((skill) => skill.toLowerCase().includes(term)) ||
        education.degree?.toLowerCase().includes(term) ||
        education.institution?.toLowerCase().includes(term) ||
        education.yearOfCompletion?.toString().includes(term)
      );
    });

    setFilteredApps(filtered);
  }, [searchSkill, applications]);

  const toggleResume = (id) => {
    setVisibleResumes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const downloadCSV = () => {
    const headers = [
      "S.No",
      "Name",
      "Email",
      "Phone",
      "Experience",
      "Skills",
      "Degree",
      "Institution",
      "Year of Completion",
      "Resume URL"
    ];

    const rows = filteredApps.map((app, index) => [
      index + 1,
      app.candidate?.name || "",
      app.candidate?.email || "",
      app.candidate?.phone || "",
      app.experience || "",
      app.skills?.join(", ") || "",
      app.education?.degree || "",
      app.education?.institution || "",
      app.education?.yearOfCompletion || "",
      app.resumeUrl || ""
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.map((x) => `"${x}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `job_applications_${jobId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading)
    return <p className="text-center text-gray-400 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-400 text-lg">{error}</p>;

  return (
    <div className="min-h-screen px-6 py-10 md:px-20 bg-gradient-to-b from-black via-gray-900 to-blue-950 text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Job Applications
          </h1>
          <p className="text-gray-300 mt-2">
            Review and analyze candidates applying for your openings.
          </p>
        </div>

        {job && (
          <div className="bg-black/40 border border-blue-900 rounded-lg p-6 space-y-3">
            <h2 className="text-2xl font-semibold text-white">{job.title}</h2>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Company:</span>{" "}
              {job.company}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Location:</span>{" "}
              {job.location?.city}, {job.location?.state}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Salary:</span> ₹
              {job.salary.min} – ₹{job.salary.max}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">Experience:</span>{" "}
              {job.experience}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-white">
                Total Applications:
              </span>{" "}
              {applications.length}
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
          <Input
            type="text"
            placeholder="Search by name, email, skill, education..."
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            className="w-full md:max-w-xl bg-black border-gray-700 placeholder-gray-400 text-white"
          />
          <Button
            variant="outline"
            className="bg-blue-950 border border-blue-800 hover:bg-green-500 text-white"
            onClick={downloadCSV}
          >
            Download CSV
          </Button>
        </div>

        <Separator className="my-6 bg-black" />

        {filteredApps.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            No applications found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-black text-left text-gray-400">
                  <th className="p-3">S.No.</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Experience</th>
                  <th className="p-3">Skills</th>
                  <th className="p-3">Education</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app, index) => (
                  <tr
                    key={app._id}
                    className="border-b border-gray-700 hover:bg-gray-800/50"
                  >
                    <td className="p-3 text-gray-300">{index + 1}</td>
                    <td className="p-3 font-medium text-white">
                      {app.candidate?.name}
                    </td>
                    <td className="p-3 text-gray-300">
                      <p>{app.candidate?.email}</p>
                      <p>{app.phone}</p>
                    </td>
                    <td className="p-3 text-gray-300">{app.experience}</td>
                    <td className="p-3 text-gray-300">
                      {app.skills?.join(", ")}
                    </td>
                    <td className="p-3 text-gray-300">
                      {app.education?.degree}, {app.education?.institution} (
                      {app.education?.yearOfCompletion})
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleResume(app._id)}
                        className="text-sm text-blue-400 hover:underline"
                      >
                        {visibleResumes[app._id]
                          ? "Hide Resume"
                          : "View Resume"}
                      </button>
                      {visibleResumes[app._id] && (
                        <div className="mt-2">
                          <iframe
                            src={app.resumeUrl}
                            title={`Resume of ${app.candidate?.name}`}
                            className="w-full h-96 border border-gray-600 rounded-md"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;
