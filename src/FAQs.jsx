import React from "react";

const FAQs = () => {
  const faqs = [
    {
      q: "How do I create an account?",
      a: "Click Register on the main page, enter your details, choose Candidate or Employer, and verify your email if prompted."
    },
    {
      q: "Is KaamKaro free to use?",
      a: "Yes it is free for everyone i.e., both employers and jobseekers.."
    },
    {
      q: "How does the AI resume evaluator work?",
      a: "Our system analyzes structure, keywords, and achievement-oriented language. It returns an actionable score and suggestions — think of it as a friendly, blunt editor."
    },
    {
      q: "Can employers contact me directly?",
      a: "Yes they can have the access of your application if you apply to any of their job's posting."    },
    {
      q: "How do I report a suspicious job or user?",
      a: "Send us an email on 'support@kaamkaro.com' with details and screenshots and we will take strict and legal action."
    },
    {
      q: "Who can I contact for help?",
      a: "Support: support@kaamkaro.com. For partnerships: partnerships@kaamkaro.com."
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 text-gray-100 p-8 sm:p-12 lg:p-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-blue-500">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <details key={idx} className="bg-gray-800/50 p-4 rounded-lg border border-blue-500/20">
              <summary className="cursor-pointer text-lg font-semibold text-white">{f.q}</summary>
              <p className="mt-2 text-gray-300">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
