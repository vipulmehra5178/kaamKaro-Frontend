import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { Briefcase, LogOut, User, Menu, X, FileSearch } from "lucide-react"; 

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const commonLinks = [
    { to: "/jobs", label: "Browse Jobs", icon: <Briefcase size={20} className="text-blue-400" /> },
    { to: "/resume-evaluator", label: "Check ATS", icon: <FileSearch size={20} className="text-blue-400" /> }, 
  ];

  const candidateLinks = [
    { to: "/my-applications", label: "My Applications", icon: <User size={20} className="text-blue-400" /> },
  ];

  const employerLinks = [
    { to: "/post-job", label: "Post Job", icon: <Briefcase size={20} className="text-blue-400" /> },
    { to: "/my-posted-jobs", label: "My Posted Jobs", icon: <User size={20} className="text-blue-400" /> },
  ];

  const navLinks = user
    ? user.role === "employer"
      ? [...commonLinks, ...employerLinks]
      : [...commonLinks, ...candidateLinks]
    : [{ to: "/login", label: "Login", icon: <LogOut size={20} className="text-blue-400" /> }];

  return (
    <nav className="bg-gradient-to-r from-black via-blue-900 to-gray-900 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
              KaamKaro
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700/50 hover:shadow-blue-500/30 transition-all duration-300"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <span className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                  <User size={20} className="text-blue-400" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-600/80 hover:bg-red-700 hover:shadow-red-500/30 transition-all duration-300"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl hover:bg-blue-700/50 transition-all duration-300"
            >
              {isOpen ? <X size={24} className="text-blue-400" /> : <Menu size={24} className="text-blue-400" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={toggleMenu}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700/50 hover:shadow-blue-500/30 transition-all duration-300 block"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {user && (
              <>
                <span className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-200">
                  <User size={20} className="text-blue-400" />
                  {user.name}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className=" cursor-pointer flex items-center  gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-600/80 hover:bg-red-700 hover:shadow-red-500/30 transition-all duration-300 w-full text-left"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
