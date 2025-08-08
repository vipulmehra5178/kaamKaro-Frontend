import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Briefcase,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black via-blue-950 to-gray-900 text-gray-300 pt-12 pb-6 relative">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="text-blue-400" size={28} />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent">
                KaamKaro
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Connecting India’s talent with the right opportunities. Whether
              you're hiring or job hunting — KaamKaro has your back.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="hover:text-blue-400 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="hover:text-blue-400 transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/resume-tips"
                  className="hover:text-blue-400 transition"
                >
                  Resume Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/career-advice"
                  className="hover:text-blue-400 transition"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-blue-400 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest job alerts and career news.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-900/50"
              />
              <Button
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} KaamKaro. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <X size={18} />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
