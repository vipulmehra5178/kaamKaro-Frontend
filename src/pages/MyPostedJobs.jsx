import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [counts, setCounts] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${apiBase}/api/jobs/my-jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Unexpected server response");
        setJobs(data);
        setFiltered(data);

        const countPromises = data.map((job) =>
          fetch(`${apiBase}/api/applications/job/${job._id}/count`, {
            headers: { Authorization: `Bearer ${token}` },
          })
            .then((r) => r.json())
            .then((json) => ({
              id: job._id,
              count: json.applicationCount || 0,
            }))
            .catch(() => ({ id: job._id, count: 0 }))
        );
        const results = await Promise.all(countPromises);
        const map = {};
        results.forEach(({ id, count }) => (map[id] = count));
        setCounts(map);
      } catch (err) {
        console.error("Error fetching posted jobs:", err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [apiBase, token]);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) setFiltered(jobs);
    else
      setFiltered(jobs.filter((job) => job.title.toLowerCase().includes(term)));
  }, [searchTerm, jobs]);

  const totalApplications = Object.values(counts).reduce((a, b) => a + b, 0);

  const handleDelete = async (jobId) => {
    const confirmDelete = confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${apiBase}/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete job");
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Something went wrong while deleting.");
    }
  };

  if (loading)
    return <p className="text-center text-gray-400 text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-400 text-lg">{error}</p>;

  return (
    <div className="min-h-screen px-6 py-10 md:px-20 bg-gradient-to-b from-black via-gray-900 to-blue-950 text-white">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">My Dashboard</h1>
          <p className="text-gray-300 mt-2">
            Overview and management of your posted jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <Card className="bg-black border border-blue-900">
            <CardContent className="p-4">
              <p className="text-gray-400 text-sm">Jobs Posted</p>
              <h2 className="text-3xl font-bold text-white">{jobs.length}</h2>
            </CardContent>
          </Card>
          <Card className="bg-black border border-blue-900">
            <CardContent className="p-4">
              <p className="text-gray-400 text-sm">Active Listings</p>
              <h2 className="text-3xl font-bold text-white">
                {jobs.filter((job) => !job.isClosed).length}
              </h2>
            </CardContent>
          </Card>
          <Card className="bg-black border border-blue-900">
            <CardContent className="p-4">
              <p className="text-gray-400 text-sm">Total Applications</p>
              <h2 className="text-3xl font-bold text-white">
                {totalApplications}
              </h2>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Input
            type="text"
            placeholder="Search jobs by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl mx-auto bg-black border-gray-700 placeholder-gray-400 text-white"
          />
        </div>

        <Separator className="my-6 bg-black" />

        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No jobs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse rounded-md text-sm">
              <thead>
                <tr className="bg-black text-left text-gray-400">
                  <th className="p-3">S.No.</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Company</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Applications</th>
                  <th className="p-3">Posted On</th>
                  <th className="p-3">View</th>
                  <th className="p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((job, index) => (
                  <tr
                    key={job._id}
                    className="border-b border-gray-700 hover:bg-gray-800/50"
                  >
                    <td className="p-3 text-gray-300">{index + 1}</td>
                    <td className="p-3 font-medium text-white">{job.title}</td>
                    <td className="p-3 text-gray-300">{job.company}</td>
                    <td className="p-3 text-gray-300">
                      {job.location?.city}, {job.location?.state}
                    </td>
                    <td className="p-3 text-gray-300">
                      {counts[job._id] || 0}
                    </td>
                    <td className="p-3 text-gray-300">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/employer/job/${job._id}/applications`}
                        className="text-blue-400 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
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

export default MyPostedJobs;
