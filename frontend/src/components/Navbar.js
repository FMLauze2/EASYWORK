import React from 'react';
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-white/90 backdrop-blur border-b border-gray-200 px-8 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-indigo-700 font-extrabold text-2xl tracking-tight select-none drop-shadow-sm">EasyWork</span>
      </div>
      <div className="flex gap-2">
        <Link
          to="/"
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-150 ${location.pathname === '/' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-700 hover:bg-indigo-50'}`}
        >
          Accueil
        </Link>
        <Link
          to="/suivi"
          className={`px-5 py-2 rounded-lg font-semibold transition-all duration-150 ${location.pathname === '/suivi' ? 'bg-indigo-600 text-white shadow-md' : 'text-indigo-700 hover:bg-indigo-50'}`}
        >
          Suivi détaillé
        </Link>
      </div>
    </nav>
  );
}
