import React from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, Briefcase, Sparkles } from "lucide-react";
import useAuth from "../context/useAuth";
import ResumeEvaluator from "./ResumeEvaluator";

const Welcome = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-black via-blue-950 to-gray-900 text-white px-6 sm:px-12 lg:px-20 py-12 font-sans relative overflow-hidden">
      
      <div className="max-w-xl text-center md:text-left z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          {user ? (
            <>Welcome , <span className="text-blue-400">{user.name}</span> 👋</>
          ) : (
            <>Welcome to <span className="text-blue-400">KaamKaro</span></>
          )}
        </h1>

        <p className="text-lg md:text-xl mb-8 font-light text-gray-200 text-justify">
          Discover career opportunities, hire top talent, and use our special{" "}
          <span className="text-blue-300 font-semibold"><Link to="/resume-evaluator">{" "}ATS Baba</Link> 
</span> 
          {" "} an AI Resume Analyzer to instantly spot strengths and areas for improvement in your CV.
          Whether you're here to hire or to get hired, KaamKaro makes the process
          simple, fast, and effective.
        </p>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {!user && (
            <>
              <Link to="/register">
                <button className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors duration-200">
                  <LogIn size={20} />
                  Register
                </button>
              </Link>
              <Link to="/post-job">
                <button className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-green-600 rounded-lg text-white font-semibold hover:bg-green-700 transition-colors duration-200">
                  <UserPlus size={20} />
                  Post-Job
                </button>
              </Link>
            </>
          )}

          <Link to="/jobs">
            <button className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-gray-800 rounded-lg text-white font-semibold hover:bg-gray-900 transition-colors duration-200">
              <Briefcase size={20} />
              Browse Jobs
            </button>
          </Link>

          <Link to="/resume-evaluator">
            <button className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors duration-200">
              <Sparkles size={20} />
              Check Your Resume with ATS Baba
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10 md:mt-0 md:ml-10 w-full md:w-1/2 z-10">
        <img
          src="/wel.svg"
          alt="Job search illustration"
          className="w-full h-auto max-h-[420px] object-contain"
        />
      </div>
    </div>
  );
};

export default Welcome;
