import React from "react";

const ResumeTips = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 text-gray-100 p-8 sm:p-12 lg:p-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-blue-500">
          Resume Tips — Get Noticed, Not Ignored
        </h1>
        <p className="text-gray-300 mb-6">
          Short, sharp, and actually useful resume advice. No fluff, no buzzwords (well, minimal).
        </p>

        <ol className="list-decimal ml-6 space-y-4 text-gray-300">
          <li>
            <strong>Lead with impact:</strong> Start with a 1–2 line summary that explains what you do and the results you deliver. Quantify where possible: “Reduced onboarding time by 40%.”
          </li>
          <li>
            <strong>Tailor per application:</strong> Mirror the job description’s keywords (honestly) and highlight the most relevant projects.
          </li>
          <li>
            <strong>Keep it scannable:</strong> Use clear headings, bullet points, and short lines. Hiring managers skim in 6–8 seconds.
          </li>
          <li>
            <strong>Show outcomes, not tasks:</strong> “Managed a team” → “Led a 4-person team to deliver X, increasing Y by Z%.”
          </li>
          <li>
            <strong>Skills section = signal:</strong> List tools & tech clearly. Avoid vague terms like “hardworking” — prove it with results.
          </li>
          <li>
            <strong>Clean design wins:</strong> One page for junior roles. Two pages only if you’ve actually earned it. Use readable fonts and sensible spacing.
          </li>
          <li>
            <strong>Proofread:</strong> Typos = instant rejection. Use spell-check, then read aloud.
          </li>
          <li>
            <strong>Attach a tailored cover note:</strong> 3 lines explaining why you fit — polite, precise, memorable.
          </li>
        </ol>

        <div className="mt-8 text-gray-400">
          <p className="italic">Want KaamKaro’s automated resume score and suggestions? Upload your resume on the Dashboard — our AI will tear it apart gently and tell you how to fix it.</p>
        </div>
      </div>
    </section>
  );
};

export default ResumeTips;
