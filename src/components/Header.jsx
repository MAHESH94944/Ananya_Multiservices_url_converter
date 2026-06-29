// src/components/Header.jsx
import { FiLink } from 'react-icons/fi';

const Header = () => {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
        <FiLink className="text-white text-xl" />
      </div>
      <div>
        <h1 className="text-base font-bold text-slate-800 dark:text-white">Ananya Multiservices</h1>
        <span className="text-xs font-medium text-purple-600 dark:text-purple-400">URL Converter</span>
      </div>
    </div>
  );
};

export default Header;