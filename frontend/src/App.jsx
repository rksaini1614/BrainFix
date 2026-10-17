import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    // 'bg-gray-50' hata kar background dark kar diya taaki white borders na aayen
    <div className="min-h-screen bg-[#0a0c10]">
        
      {/* Navbar - Isko bhi thoda match kara diya theme se (optional) */}
      <nav className="bg-black/90 text-white p-4 flex justify-between items-center shadow-[0_0_15px_rgba(30,144,255,0.2)] border-b border-blue-900/50">
        <h1 className="text-xl font-bold tracking-wider text-blue-400 cursor-pointer">BrainFix</h1>
        {user ? (
          <div className="flex gap-4 items-center">
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="bg-red-500/80 px-3 py-1 rounded hover:bg-red-600 transition-colors">Logout</button>
          </div>
        ) : (
          <div className="flex gap-4">
            {/* Only show if not logged in */}
          </div>
        )}
      </nav>

      {/* Yahan se 'container mx-auto p-4' hata diya gaya hai */}
      <div className="w-full">
        <Routes>
          <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;