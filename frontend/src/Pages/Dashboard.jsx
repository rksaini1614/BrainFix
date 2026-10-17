import { useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  
  const [questionText, setQuestionText] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Handle Drag & Drop Image
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); 
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': [] },
    multiple: false
  });

  const handleAnalyze = async () => {
    if (!imageBase64 || !questionText) {
      setError("Please enter the question and upload a solution image.");
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/analyze`, {
        questionText,
        imageBase64
      });
      setResult(response.data);
    } catch (err) {
      setError("Failed to analyze image. Ensure your backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null; 

  return (
    // Changed to flex-col on mobile, flex-row on md (desktop/tablet)
    <div className="flex flex-col md:flex-row h-screen bg-[#05070a] text-gray-200 overflow-hidden font-sans absolute inset-0 z-50">
      
      {/* ================= HEADER / SIDEBAR ================= */}
      <div className="w-full md:w-72 h-auto md:h-full flex-shrink-0 bg-[#0a0c10]/80 border-b md:border-b-0 md:border-r border-blue-900/50 backdrop-blur-xl flex flex-row md:flex-col justify-between items-center md:items-stretch p-4 md:p-6 shadow-[0_5px_30px_rgba(0,0,0,0.5)] md:shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20">
        
        {/* Top/Left: Brand Logo & Desktop Profile */}
        <div className="flex flex-col gap-0 md:gap-10">
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl">🧠</span>
            <span className="text-xl md:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              BrainFix
            </span>
          </div>

          {/* User Profile Info (Hidden on Mobile, Visible on Desktop) */}
          <div className="hidden md:flex bg-white/[0.03] border border-blue-500/20 rounded-xl p-4 items-center gap-4 shadow-[inset_0_0_15px_rgba(255,255,255,0.02)]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-xl font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h3 className="text-white font-semibold truncate">{user.name}</h3>
              <p className="text-xs text-blue-400/80 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom/Right: Mobile Profile + Logout */}
        <div className="flex items-center gap-3">
          {/* Mobile Profile Avatar */}
          <div className="md:hidden w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_10px_rgba(6,182,212,0.4)] shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <button 
            onClick={logout}
            className="flex items-center justify-center gap-2 py-2 px-3 md:py-3 md:px-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-300 font-semibold text-sm md:text-base w-auto md:w-full"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 relative overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-10 scroll-smooth w-full">
        
        {/* Background Grid & Blur */}
        <div className="absolute inset-0 -z-10 bg-[#05070a]" style={{ backgroundImage: 'radial-gradient(rgba(30, 144, 255, 0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-bl from-blue-600/20 via-cyan-500/10 to-transparent rounded-full filter blur-[80px] md:blur-[120px] -z-10" />

        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-20">
          
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Analyze New Problem
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 md:p-4 rounded-xl text-sm md:text-base break-words">
              {error}
            </div>
          )}

          {/* Upload Glass Card */}
          <div className="bg-white/[0.03] border border-blue-500/30 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-[0_0_30px_rgba(0,191,255,0.05)] w-full">
            
            {/* Question Input */}
            <div className="mb-5 md:mb-6">
              <label className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">1. Original Question</label>
              <input 
                type="text" 
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="e.g. Solve for x: 2x^2 + 5x - 3 = 0" 
                className="w-full bg-[#121620]/60 border border-blue-500/30 focus:border-cyan-400 text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-gray-600 text-sm md:text-base"
              />
            </div>

            {/* Drag & Drop Area */}
            <div className="mb-5 md:mb-6">
              <label className="block text-xs md:text-sm font-semibold uppercase tracking-wider text-blue-400 mb-2">2. Upload Your Solution</label>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive ? 'border-cyan-400 bg-cyan-400/10' : 'border-blue-500/30 hover:border-blue-400 hover:bg-blue-500/5'
                }`}
              >
                <input {...getInputProps()} />
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img src={previewUrl} alt="Preview" className="max-h-32 md:max-h-48 rounded-lg mb-3 md:mb-4 shadow-lg object-contain" />
                    <p className="text-cyan-400 font-semibold text-sm md:text-base">Image ready! Tap or drag to change.</p>
                  </div>
                ) : (
                  <div className="py-4 md:py-6">
                    <span className="text-3xl md:text-4xl mb-2 md:mb-3 block">📸</span>
                    <p className="text-gray-400 text-sm md:text-base">Tap or drag & drop handwritten solution here</p>
                    <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG, WEBP</p>
                  </div>
                )}
              </div>
            </div>

            {/* Analyze Button */}
            <button 
              onClick={handleAnalyze} 
              disabled={loading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 md:py-4 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] flex justify-center items-center gap-2 text-sm md:text-base"
            >
              {loading ? (
                <><span className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing Logic...</>
              ) : (
                'Run AI Analysis 🚀'
              )}
            </button>
          </div>

          {/* ================= RESULTS SCREEN ================= */}
          {result && (
            <div className="bg-white/[0.03] border border-blue-500/30 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-xl animate-fade-in-up w-full overflow-hidden">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-5 md:mb-6 pb-4 border-b border-gray-700/50">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl shrink-0 ${result.isCorrect ? 'bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'}`}>
                  {result.isCorrect ? '✅' : '🚨'}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Diagnostic Report</h3>
                  <p className={`text-sm md:text-base ${result.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                    Status: {result.isCorrect ? "Perfectly Solved!" : "Mistake Detected"}
                  </p>
                </div>
              </div>
              
              {!result.isCorrect && (
                <div className="space-y-4 md:space-y-6">
                  {/* Where they went wrong */}
                  <div className="bg-[#121620]/60 p-4 md:p-5 rounded-xl border-l-4 border-red-500">
                    <h4 className="text-red-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">Error Step</h4>
                    <p className="text-gray-200 text-sm md:text-lg font-mono bg-black/40 p-3 rounded break-words">{result.errorStep}</p>
                  </div>

                  {/* Explanation */}
                  <div className="bg-[#121620]/60 p-4 md:p-5 rounded-xl border-l-4 border-blue-500">
                    <h4 className="text-blue-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">Why it happened ({result.errorCategory})</h4>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed break-words">{result.explanation}</p>
                  </div>

                  {/* Correct Solution Section */}
                  {result.correctSolution && (
                    <div className="bg-[#121620]/60 p-4 md:p-5 rounded-xl border-l-4 border-green-500">
                      <h4 className="text-green-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">How to solve it correctly</h4>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words font-mono text-xs md:text-sm bg-black/40 p-3 md:p-4 rounded-lg overflow-x-auto">
                        {result.correctSolution}
                      </p>
                    </div>
                  )}
                  
                  {/* Practice Questions */}
                  <div>
                    <h4 className="text-cyan-400 text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2">
                      <span>🎯</span> Targeted Practice
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {result.practiceQuestions?.map((q, index) => (
                        <div key={index} className="bg-[#121620]/40 border border-cyan-500/20 p-3 md:p-4 rounded-xl hover:border-cyan-500/50 transition-colors">
                          <span className={`inline-block px-2 py-1 rounded text-[10px] md:text-xs font-bold mb-2 md:mb-3 ${q.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                            {q.difficulty}
                          </span>
                          <p className="text-gray-200 font-medium text-sm md:text-base mb-2">{q.question}</p>
                          <p className="text-[10px] md:text-xs text-cyan-500/70">Concept: {q.conceptToFix}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* If Correct */}
              {result.isCorrect && (
                <div className="text-center py-6 md:py-8 space-y-4 md:space-y-6">
                  <p className="text-gray-300 text-base md:text-lg mb-2 md:mb-4">Great job! Your logic and steps are absolutely correct.</p>
                  
                  {result.correctSolution && (
                    <div className="bg-[#121620]/60 p-4 md:p-5 rounded-xl border-l-4 border-green-500 text-left max-w-2xl mx-auto">
                      <h4 className="text-green-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-2">Clean Solution Reference</h4>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap break-words font-mono text-xs md:text-sm bg-black/40 p-3 md:p-4 rounded-lg overflow-x-auto">
                        {result.correctSolution}
                      </p>
                    </div>
                  )}

                  <button className="px-5 py-2 md:px-6 md:py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-colors text-sm md:text-base">
                    Move to next challenge
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}