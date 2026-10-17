import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      login(response.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-[#05070a] text-[#e2e8f0] relative overflow-hidden">
      
      {/* --- BACK TO HOME BUTTON --- */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group z-20"
      >
        <svg 
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="font-medium text-sm tracking-wider uppercase">Home</span>
      </Link>

      {/* 1. BLUE GRID DOTS AND GRADIENT BACKGROUND */}
      <div 
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: '#05070a',
          backgroundImage: 'radial-gradient(rgba(30, 144, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Glowing Neon ambient backdrop blurring behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/30 via-cyan-500/25 to-transparent rounded-full filter blur-[120px] -z-10 animate-pulse" />

      {/* 2. GLASS EFFECT CONTAINER (Backdrop blur) */}
      <div className="w-full max-w-md bg-white/[0.03] border border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,191,255,0.15),_inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-xl relative overflow-hidden">
        {/* Subtle glowing highlight on top */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
        
        {/* Branded Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl animate-pulse">🧠</span>
            <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(30,144,255,0.5)]">
              BrainFix
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-blue-400/80 font-bold mb-6">
            WELCOME BACK
          </p>
          <h2 className="text-xl font-bold tracking-wide text-white">Log in to your Account</h2>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-4 text-sm text-red-400 border border-red-500/30 bg-red-950/20 px-3 py-2 rounded-lg text-center shadow-[0_0_15px_rgba(239,68,68,0.15)]">
            🚨 {error}
          </div>
        )}

        {/* Form Inputs with dark glass look */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5 pl-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. jamesmill@gmail.com"
              className="w-full bg-[#121620]/40 border border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 pl-1 pr-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400">
                Password
              </label>
              <a href="#" className="text-xs text-blue-500 hover:text-cyan-400 transition-colors">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#121620]/40 border border-blue-500/20 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

          {/* Neon Gradient Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 relative group overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {/* Create Account route anchor */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 underline decoration-cyan-400/30 hover:decoration-cyan-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}