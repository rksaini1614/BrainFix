import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      // Connects with your Node/Express Backend Auth Route
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
      login(response.data); // Stores the user globally
      navigate('/dashboard'); // Direct redirects to User Home Dashboard
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to Register Account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Added 'relative' here so the absolute back button works perfectly
    <div className="min-h-[90vh] flex items-center justify-center p-4 bg-[#0a0c10] text-[#e2e8f0] relative">
      
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

      {/* Backdrops, HUD glow lines and custom background designs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black -z-10" />

      {/* Futuristic Responsive Card Container */}
      <div className="w-full max-w-md bg-black/80 border border-blue-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(30,144,255,0.15)] backdrop-blur-md relative overflow-hidden">
        {/* Top glowing edge effect */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        
        {/* Branded Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-3xl animate-pulse">🧠</span>
            <span className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(30,144,255,0.5)]">
              BrainFix
            </span>
          </div>
          <p className="text-xs uppercase tracking-[0.25em] text-blue-400/80 font-semibold mb-6">
            Fix the Gap. Level Up!
          </p>
          <h2 className="text-xl font-bold tracking-wide text-white">Create your Account</h2>
        </div>

        {/* Register submission error state */}
        {error && (
          <div className="mb-4 text-sm text-red-400 border border-red-500/30 bg-red-950/20 px-3 py-2 rounded-lg text-center shadow-[0_0_10px_rgba(239,68,68,0.1)]">
            🚨 {error}
          </div>
        )}

        {/* Input fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5 pl-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. James Mill"
              className="w-full bg-[#121620]/90 border border-blue-500/20 focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

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
              className="w-full bg-[#121620]/90 border border-blue-500/20 focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5 pl-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#121620]/90 border border-blue-500/20 focus:border-blue-400 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white px-4 py-3 rounded-xl outline-none transition-all placeholder:text-gray-600 text-sm"
            />
          </div>

          {/* Glowing neon submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 cursor-pointer relative group overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        {/* Existing login link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 underline decoration-cyan-400/30 hover:decoration-cyan-300"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}