
import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Briefcase } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-black via-blue-900 to-black text-white p-10 font-sans">
      
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg font-sans">
          Welcome to <span className="text-orange-400">KaamKaro</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 font-medium text-gray-200 drop-shadow-sm">
          Discover your career move or hire the perfect candidate – all in one place.
        </p>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Link to="/login">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition text-base md:text-lg">
              <LogIn size={20} />
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-md transition text-base md:text-lg">
              <UserPlus size={20} />
              Register
            </button>
          </Link>
          <Link to="/jobs">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg shadow-md transition text-base md:text-lg">
              <Briefcase size={20} />
              Browse Jobs
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10 md:mt-0 md:ml-10 w-full md:w-1/2">
        <img
          src="/wel.svg"
          alt="Job search illustration"
          className="w-full h-auto max-h-[400px] object-contain drop-shadow-xl rounded-xl"
        />
      </div>
    </div>
  );
};

export default Welcome;