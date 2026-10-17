import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // Typewriter Effect Logic
  const words = [
    "Conceptual Errors.",
    "Calculation Mistakes.",
    "Formula Blunders.",
    "Unresolved Learning Gaps."
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const currentWord = words[currentWordIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        // Pause when word is fully typed
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        // Move to the next word when fully deleted
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        // Type or delete characters
        setCurrentText(
          currentWord.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-4 bg-[#05070a] text-[#e2e8f0] relative overflow-hidden text-center mt-[-4rem]">
      
      {/* 1. BLUE GRID DOTS BACKGROUND */}
      <div 
        className="absolute inset-0 -z-20"
        style={{
          backgroundColor: '#05070a',
          backgroundImage: 'radial-gradient(rgba(30, 144, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
      
      {/* Glowing Neon Ambient Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/20 to-transparent rounded-full filter blur-[150px] -z-10 animate-pulse" />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 z-10 flex flex-col items-center">
        
        {/* Animated Brain Icon */}
        <div className="text-7xl mb-6 drop-shadow-[0_0_25px_rgba(30,144,255,0.6)] animate-bounce">
          🧠
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-white">Diagnose and Fix </span>
          <br className="md:hidden" />
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            BrainFix
          </span>
        </h1>

        {/* Typewriter Effect Container */}
        <div className="h-12 md:h-16 mb-8 flex items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-300">
            Stop repeating <span className="text-cyan-400 font-bold">{currentText}</span>
            <span className="inline-block w-1 h-8 md:h-10 ml-1 bg-cyan-400 animate-pulse align-middle"></span>
          </h2>
        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          The AI-powered Socratic tutor that doesn't just give you the answer. 
          Upload your handwritten math, find exactly where your logic failed, and level up with targeted practice.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
          <Link
            to="/signup"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl font-bold text-lg text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300 overflow-hidden flex items-center justify-center w-full sm:w-auto"
          >
            {/* Inner glow effect on hover */}
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 skew-x-12"></div>
            <span>Get Started Free</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <Link
            to="/login"
            className="px-8 py-4 bg-white/[0.03] backdrop-blur-md border border-blue-500/30 rounded-xl font-bold text-lg text-blue-400 hover:bg-white/[0.08] hover:border-cyan-400 hover:text-cyan-300 shadow-[0_0_15px_rgba(0,191,255,0.05)] transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
          >
            Log In
          </Link>
        </div>
        
      </div>
    </div>
  );
}