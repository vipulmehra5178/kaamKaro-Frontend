import React, { useState } from 'react';

const ApplyJobForm = ({ jobId }) => {
  const [form, setForm] = useState({
    skills: '', experience: '', degree: '', institution: '',
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

      setMessage('✅ ' + data.message);
      setForm({ skills: '', experience: '', degree: '', institution: '', yearOfCompletion: '', portfolioLinks: '', coverLetter: '' });
      setResume(null);
    } catch (err) {
      setMessage('❌ ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-3xl shadow-xl space-y-6">
      <h3 className="text-2xl font-bold text-cyan-400">📝 Application Form</h3>

      <div className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          required
          className="w-full bg-[#374151] border border-gray-600 rounded px-3 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
        />

        {[
          ['skills', 'Skills (comma separated)'],
          ['experience', 'Experience (e.g. 2 years, Fresher)'],
          ['degree', 'Degree (e.g. B.Tech)'],
          ['institution', 'Institution (e.g. IIT Delhi)'],
          ['yearOfCompletion', 'Year of Completion (e.g. 2023)'],
          ['portfolioLinks', 'Portfolio Links (comma separated)']
        ].map(([name, placeholder]) => (
          <input
            key={name}
            name={name}
            value={form[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full bg-[#374151] border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400"
            required={name !== 'portfolioLinks'}
          />
        ))}

        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          placeholder="Write your cover letter here..."
          rows={4}
          className="w-full bg-[#374151] border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2 rounded-full shadow-lg hover:from-teal-600 hover:to-blue-600 transition-all transform hover:scale-105"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>

      {message && (
        <p className="text-sm text-center mt-2 text-cyan-300">{message}</p>
      )}
    </form>
  );
};

export default ApplyJobForm;
