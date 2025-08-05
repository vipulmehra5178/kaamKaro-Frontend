import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { Briefcase, LogOut, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const commonLinks = [
    { to: "/jobs", label: "Browse Jobs", icon: <Briefcase size={20} /> },
  ];

  const candidateLinks = [
    { to: "/my-applications", label: "My Applications", icon: <User size={20} /> },
  ];

  const employerLinks = [
    { to: "/post-job", label: "Post Job", icon: <Briefcase size={20} /> },
    { to: "/my-posted-jobs", label: "My Posted Jobs", icon: <User size={20} /> },
  ];

  const navLinks = user
    ? user.role === "employer"
      ? [...commonLinks, ...employerLinks]
      : [...commonLinks, ...candidateLinks]
    : [{ to: "/login", label: "Login", icon: <LogOut size={20} /> }];

  return (
    <nav className="bg-gradient-to-r from-black via-blue-900 to-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-400">
              KaamKaro
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition"
              >
                <LogOut size={20} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-blue-700 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition block"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition w-full text-left"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;