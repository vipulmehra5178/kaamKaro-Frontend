import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus, Briefcase } from 'lucide-react';
import useAuth from '../context/useAuth';

const Welcome = () => {
  const { user } = useAuth(); 
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-black via-blue-900 to-gray-900 text-white p-6 sm:p-10 lg:p-16 font-sans relative overflow-hidden">
     

      {/* Left Content */}
      <div className="max-w-xl text-center md:text-left z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent drop-shadow-xl">
          {user ? (
            <>Welcome back, <span className="text-blue-400">{user.name}</span> 👋</>
          ) : (
            <>Welcome to <span className="text-blue-400">KaamKaro</span></>
          )}
        </h1>

        {!user && (
          <p className="text-lg md:text-xl mb-8 font-light text-gray-200 drop-shadow-sm">
            Discover elite career opportunities or hire top talent with KaamKaro's premium platform.
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          {!user && (
            <>
              <Link to="/login">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-base md:text-lg font-semibold">
                  <LogIn size={20} />
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-base md:text-lg font-semibold">
                  <UserPlus size={20} />
                  Register
                </button>
              </Link>
            </>
          )}

          <Link to="/jobs">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 text-base md:text-lg font-semibold">
              <Briefcase size={20} />
              Browse Jobs
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10 md:mt-0 md:ml-10 w-full md:w-1/2 z-10">
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
