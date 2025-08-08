import React from "react";

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 text-gray-100 p-8 sm:p-12 lg:p-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-blue-500">
          About KaamKaro
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          KaamKaro exists because job hunting and hiring shouldn’t feel like a labyrinth built by sadists. We connect talented professionals across India with great employers — fast, fairly, and with a little bit of finesse.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-white">Our Mission</h2>
        <p className="text-gray-300 mb-4">
          To simplify the job journey for both seekers and employers by building a trustworthy, AI-augmented platform that prioritizes fit, clarity, and actionable feedback.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-white">What We Value</h2>
        <ul className="list-disc ml-5 text-gray-300 space-y-2">
          <li>Practicality — tools that actually save time.</li>
          <li>Transparency — fair job descriptions and fair hiring.</li>
          <li>Local focus — features and choices built with India in mind.</li>
          <li>Respect — for candidates, employers, and the craft of work.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-white">Where We’re Headed</h2>
        <p className="text-gray-300">
          Smarter matching, better resume feedback, and a community where both sides — talent and recruiters — walk away with clarity. No snake oil, just better job outcomes.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
