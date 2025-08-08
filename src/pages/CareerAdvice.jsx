import React from "react";

const CareerAdvice = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-gray-900 text-gray-100 p-8 sm:p-12 lg:p-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-300 to-blue-500">
          Career Advice — Smart moves, not buzzwords
        </h1>
        <p className="text-gray-300 mb-6">
          Tactical, practical career guidance for people who want to level up without losing sleep.
        </p>

        <section className="space-y-6 text-gray-300">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">1. Invest in T-shaped skills</h2>
            <p>Have deep expertise in one area and a working knowledge of adjacent skills. This makes you adaptable and valuable.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">2. Build visible wins</h2>
            <p>Quantify results. Publicly document projects or write short posts about problems you solved — hiring teams notice impact and reasoning.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">3. Network with intent</h2>
            <p>Connect meaningfully: ask for advice, share value, follow up. A warm intro beats a cold application almost every time.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">4. Practice interviewing</h2>
            <p>Mock interviews, whiteboard practice, and story prep (STAR method) give you calm and clarity under pressure.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">5. Negotiate with data</h2>
            <p>Know market rates, list your wins, and ask confidently. Negotiation is expected — don’t apologize for advocating for fair compensation.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2 text-white">6. Keep learning, fast</h2>
            <p>Short, regular upskilling beats binge learning. Small daily practice compounds into real advantage.</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CareerAdvice;
