import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import MyPostedJobs from "./pages/MyPostedJobs";
import JobApplications from "./pages/JobApplications";
import Welcome from "./pages/Welcome";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/my-posted-jobs" element={<MyPostedJobs />} />
        <Route path="/jobs/:jobId/applications" element={<JobApplications />} />
      </Routes>
    </Router>
  );
};

export default App;
