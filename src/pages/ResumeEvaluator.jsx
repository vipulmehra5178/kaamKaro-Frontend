import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { evaluateResume } from "../context/aiService";
import useAuth from "../context/useAuth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumeEvaluator() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]?.type === "application/pdf") {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleEvaluate = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const data = await evaluateResume(file);
      setResult({
        atsScore: data?.atsScore || 0,
        suggestions: Array.isArray(data?.suggestions) ? data.suggestions : [],
        recommendedRole: data?.recommendedRole || "Not available",
      });
    } catch (error) {
      console.error("Evaluation error:", error);
      setResult(null);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#020b3d] to-[#0a1a66] p-6">
        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8 rounded-3xl text-center text-white max-w-lg">
          <Sparkles className="mx-auto text-blue-400 h-12 w-12 mb-4" />
          <h2 className="text-3xl font-bold mb-2">ATS Baba Awaits 🔮</h2>
          <p className="text-gray-300 mb-6">
            Sign in or create an account to let ATS Baba view your resume and
            predict your perfect role and help you with some suggestions with recommendations.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register")}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Register
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#020b3d] to-[#0a1a66] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8 rounded-3xl text-white relative overflow-hidden">
          <div className="absolute inset-0 rounded-3xl border border-blue-500/40 shadow-[0_0_80px_rgba(59,130,246,0.5)] pointer-events-none animate-pulse"></div>

          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <Sparkles className="mx-auto text-blue-400 h-12 w-12" />
            </motion.div>
            <CardTitle className="text-4xl font-extrabold tracking-tight">
              ATS Baba
            </CardTitle>
            <p className="text-gray-200 text-lg">
              Upload your resume for a{" "}
              <span className="text-blue-300 font-semibold">premium AI-powered</span> analysis — ATS
              compatibility, tailored suggestions, and ideal career role insights.
            </p>
          </CardHeader>

          <CardContent>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400/50 rounded-2xl p-10 cursor-pointer hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300"
            >
              <motion.div
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <Upload className="h-12 w-12 text-blue-400 mb-3" />
              </motion.div>
              {file ? (
                <p className="text-blue-300 font-medium text-lg">{file.name}</p>
              ) : (
                <p className="text-gray-300 text-base">Click or drag a PDF resume here</p>
              )}
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <Button
              onClick={handleEvaluate}
              disabled={!file || loading}
              className={`w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold rounded-xl py-6 shadow-lg transform hover:scale-105 transition-all duration-300 ${
                !file || loading ? "" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin mr-3" />
              ) : (
                <FileText className="h-6 w-6 mr-3" />
              )}
              {loading ? "Analyzing..." : "Evaluate Resume"}
            </Button>
          </CardContent>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 p-8 bg-white/15 rounded-2xl border border-white/30 space-y-6"
            >
              <h3 className="text-2xl font-bold text-blue-300">Analysis Results</h3>

              <div className="space-y-6 text-gray-200">
                <div>
                  <span className="font-semibold text-white text-lg">ATS Score:</span>
                  <p className="text-blue-400 text-xl mt-1">{result.atsScore}%</p>
                </div>

                {result.suggestions.length > 0 && (
                  <div>
                    <span className="font-semibold text-white text-lg">Suggestions:</span>
                    <ul className="list-disc list-inside text-gray-200 mt-2 space-y-2">
                      {result.suggestions.map((tip, index) => (
                        <li key={index} className="text-base">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <span className="font-semibold text-white text-lg">Recommended Role:</span>
                  <p className="text-gray-200 text-base mt-1">{result.recommendedRole}</p>
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
