// src/pages/Settings.jsx
import { useState, useEffect } from 'react';
import { FiMoon, FiSun, FiSave, FiUser, FiGlobe, FiSmartphone } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Settings = ({ toggleTheme, dark }) => {
  const [domain, setDomain] = useState('');
  const [shop, setShop] = useState('');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDomain(localStorage.getItem('ananya-domain') || 'sakhalibkgs.cscjob.com');
    setShop(localStorage.getItem('ananya-shop') || 'Ananya Multiservices');
    setPhone(localStorage.getItem('ananya-phone') || '9876543210');
  }, []);

  const handleSave = () => {
    if (!domain.trim()) {
      toast.error('Domain is required');
      return;
    }
    localStorage.setItem('ananya-domain', domain.trim());
    localStorage.setItem('ananya-shop', shop.trim() || 'Ananya Multiservices');
    localStorage.setItem('ananya-phone', phone.trim() || '');
    setSaved(true);
    toast.success('Settings saved successfully!');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="container-responsive">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in-up">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Settings</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Customize your converter</p>
        </div>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl glass-card hover:bg-purple-100/50 dark:hover:bg-purple-900/30 transition"
        >
          {dark ? <FiSun className="text-yellow-400 text-xl" /> : <FiMoon className="text-slate-600 text-xl" />}
        </button>
      </div>

      {/* Settings Form */}
      <div className="glass-card p-6 md:p-8 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {/* Domain */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <FiGlobe className="text-purple-500" />
            My Domain
          </label>
          <input
            type="text"
            className="setting-input"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="sakhalibkgs.cscjob.com"
          />
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
            Replaces <span className="font-mono text-purple-500">news.cscjob.com</span> in URLs
          </p>
        </div>

        {/* Shop Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <FiUser className="text-purple-500" />
            Shop Name
          </label>
          <input
            type="text"
            className="setting-input"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            placeholder="Ananya Multiservices"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <FiSmartphone className="text-purple-500" />
            Phone Number
          </label>
          <input
            type="tel"
            className="setting-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9876543210"
          />
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave} 
          className="btn-primary flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <FiSave className="text-green-300" />
              Saved!
            </>
          ) : (
            <>
              <FiSave />
              Save Settings
            </>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <p>All settings are saved locally in your browser</p>
      </div>
    </div>
  );
};

export default Settings;