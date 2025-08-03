import React, { useState } from 'react';

const ApplyJobForm = ({ jobId }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return setMessage('Please upload a resume');

    const formData = new FormData();
    formData.append('resume', resume); 

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/applications/${jobId}/apply`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to apply');

      setMessage(data.message);
      setResume(null);
    } catch (err) {
      console.error(err);
      setMessage(err.message || 'Something went wrong while applying');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-semibold mb-4">Apply to this Job</h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setResume(e.target.files[0])}
        className="mb-4 block w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Submitting...' : 'Apply Now'}
      </button>

      {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
    </form>
  );
};

export default ApplyJobForm;
