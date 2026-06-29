// src/components/Header.jsx
import { FiLink } from 'react-icons/fi';

const Header = () => {
  return (
    <div className="flex items-center gap-4 py-4 mb-2 animate-fade-in-up">
      <div className="relative">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <FiLink className="text-white text-2xl" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-slate-800 animate-pulse" />
      </div>
      <div>
        <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight">
          Ananya Multiservices
        </h1>
        <span className="text-xs md:text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
          URL Converter
        </span>
      </div>
    </div>
  );
};

export default Header;