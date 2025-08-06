import React, { useState } from 'react';
import {
  FileText, Code, Briefcase, BookOpen,
  Calendar, Link as LinkIcon, File, Phone
} from 'lucide-react';

const ApplyJobForm = ({ jobId }) => {
  const [form, setForm] = useState({
    phone: '', skills: '', experience: '', degree: '', institution: '',
    yearOfCompletion: '', portfolioLinks: '', coverLetter: ''
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return setMessage('Please upload a resume (PDF only)');
    if (!/^\d{10}$/.test(form.phone)) return setMessage('Phone number must be exactly 10 digits');

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append('resume', resume);

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/applications/${jobId}/apply`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to apply');

      setMessage('Application submitted successfully!');
      setForm({
        phone: '', skills: '', experience: '', degree: '', institution: '',
        yearOfCompletion: '', portfolioLinks: '', coverLetter: ''
      });
      setResume(null);
    } catch (err) {
      setMessage(+ err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 py-16 px-6 lg:px-20 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="hidden lg:block">
          <img
            src="/applynow.svg" 
            alt="Job Illustration"
            className="w-full max-w-md mx-auto drop-shadow-xl"
          />
        </div>

        {/* Right form section */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-400 to-blue-200 bg-clip-text text-transparent drop-shadow-xl">
              Apply for Your Dream Job
            </h2>
            <p className="mt-5 text-xl text-gray-200 font-light leading-relaxed">
              Submit your application with KaamKaro and step into a world of elite opportunities.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md border border-blue-500/30 rounded-3xl p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText size={24} className="text-blue-400" />
              <h3 className="text-2xl font-bold text-white tracking-tight">Application Form</h3>
            </div>

            <div className="space-y-5">
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  className="w-full bg-gray-800/80 text-white border border-blue-500/30 rounded-xl px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all"
                />
                <File size={18} className="absolute top-3 left-3 text-blue-400" />
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (10 digits)"
                  required
                  maxLength={10}
                  pattern="\d{10}"
                  className="w-full bg-gray-800/80 text-white border border-blue-500/30 rounded-xl px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <Phone size={18} className="absolute top-3 left-3 text-blue-400" />
              </div>

              {[
                { name: 'skills', placeholder: 'Skills (comma separated)', icon: <Code size={18} className="text-blue-400" /> },
                { name: 'experience', placeholder: 'Experience (e.g. 2 years, Fresher)', icon: <Briefcase size={18} className="text-blue-400" /> },
                { name: 'degree', placeholder: 'Degree (e.g. B.Tech)', icon: <BookOpen size={18} className="text-blue-400" /> },
                { name: 'institution', placeholder: 'Institution (e.g. IIT Delhi)', icon: <BookOpen size={18} className="text-blue-400" /> },
                { name: 'yearOfCompletion', placeholder: 'Year of Completion (e.g. 2023)', icon: <Calendar size={18} className="text-blue-400" /> },
                { name: 'portfolioLinks', placeholder: 'Portfolio Links (comma separated)', icon: <LinkIcon size={18} className="text-blue-400" />, required: false }
              ].map(({ name, placeholder, icon, required }) => (
                <div key={name} className="relative">
                  <input
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required={required !== false}
                    className="w-full bg-gray-800/80 text-white border border-blue-500/30 rounded-xl px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                  <div className="absolute top-3 left-3">{icon}</div>
                </div>
              ))}

              <div className="relative">
                <textarea
                  name="coverLetter"
                  value={form.coverLetter}
                  onChange={handleChange}
                  placeholder="Write your cover letter here..."
                  rows={5}
                  className="w-full bg-gray-800/80 text-white border border-blue-500/30 rounded-xl px-10 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
                <FileText size={18} className="absolute top-3 left-3 text-blue-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>

            {message && (
              <p className="text-sm text-center mt-4 text-blue-300 font-light">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobForm;
