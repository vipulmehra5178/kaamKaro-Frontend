import React from "react";

const PrivacyPolicy = () => {
  const year = new Date().getFullYear();

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-indigo-900 text-gray-100 p-6 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-cyan-400">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-400">Last updated: {year}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <p className="text-lg text-gray-200 leading-relaxed">
              KaamKaro ("we", "us", "our") respects your privacy. This page explains what information we collect, how we use it, and the choices you have.
            </p>
          </div>

          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2">
              Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li className="text-base">Account details (name, email, password hash).</li>
              <li className="text-base">Profile information (resume, experience, skills).</li>
              <li className="text-base">Usage data (pages visited, searches, interactions).</li>
              <li className="text-base">Communications (messages and support requests).</li>
            </ul>
          </div>

          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li className="text-base">To provide and improve our services (matching, notifications, analytics).</li>
              <li className="text-base">To communicate with you about your account, security, and updates.</li>
              <li className="text-base">To comply with legal obligations or to protect the safety of our users.</li>
            </ul>
          </div>

          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2">
              Sharing & Third Parties
            </h2>
            <p className="text-gray-200 text-base leading-relaxed">
              We may share data with service providers (hosting, analytics, email delivery). We do not sell your personal data. Employers only see information you choose to share when applying or opting in.
            </p>
          </div>

          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <h4 className="text-xl font-medium text-blue-300 mb-4">
              Security
            </h4>
            <p className="text-gray-200 text-base leading-relaxed">
              We use industry-standard measures to protect your data, but no system is perfect. Protect your credentials, and contact support if you suspect a breach.
            </p>
          </div>

          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2">
              Your Choices
            </h2>
            <p className="text-gray-200 text-base leading-relaxed">
              You can update your profile, delete your account, or opt out of marketing emails from your account settings. For deletion requests, contact support.
            </p>
          </div>

          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b-2 border-blue-400 pb-2">
              Contact
            </h2>
            <p className="text-gray-200 text-base leading-relaxed">
              Questions about this policy? Email: <a href="mailto:privacy@kaamkaro.example" className="text-blue-400 hover:text-blue-300 underline">privacy@kaamkaro.example</a>
            </p>
          </div>

          <div className="bg-gray-800/60 p-6 rounded-xl border border-blue-500/20 shadow-lg">
            <p className="text-sm text-gray-500 italic leading-relaxed">
              This privacy policy is a summary and not a substitute for legal advice. If you need a legally binding privacy policy tailored to your jurisdiction and business model, consult a lawyer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;