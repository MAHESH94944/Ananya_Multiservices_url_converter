// src/pages/History.jsx
import { useState, useEffect } from 'react';
import { FiCopy, FiTrash2, FiClock, FiInbox, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

const History = () => {
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ananya-history') || '[]');
    setHistory(data);
  }, []);

  const copyUrl = (url) => {
    navigator.clipboard?.writeText(url);
    setCopied(true);
    toast.success('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteItem = (timestamp) => {
    const updated = history.filter(h => h.timestamp !== timestamp);
    localStorage.setItem('ananya-history', JSON.stringify(updated));
    setHistory(updated);
    toast.success('Item removed');
  };

  const clearAll = () => {
    if (history.length === 0) return;
    localStorage.removeItem('ananya-history');
    setHistory([]);
    toast.success('History cleared');
  };

  const formatTime = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="container-responsive">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 animate-fade-in-up">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">History</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last 20 conversions</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={clearAll} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition"
          >
            <FiTrash2 />
            Clear All
          </button>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="glass-card p-12 text-center animate-fade-in-up">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <FiInbox className="text-2xl text-purple-500" />
            </div>
            <div>
              <p className="font-medium text-slate-600 dark:text-slate-300">No conversions yet</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Your converted URLs will appear here
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {history.map((item, index) => (
            <div 
              key={item.timestamp} 
              className="history-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate text-slate-700 dark:text-slate-200">
                    {item.original}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-purple-600 dark:text-purple-400 truncate font-mono">
                    {item.converted}
                  </p>
                  <span className="chip">{formatTime(item.timestamp)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button 
                  onClick={() => copyUrl(item.converted)} 
                  className="icon-btn"
                >
                  {copied ? <FiCheck className="text-green-500" size={16} /> : <FiCopy size={16} />}
                </button>
                <button 
                  onClick={() => deleteItem(item.timestamp)} 
                  className="icon-btn hover:text-red-500"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;