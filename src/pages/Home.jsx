// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { FiCopy, FiShare2, FiCheck, FiSend, FiLink, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../components/Header';

const extractUrl = (text) => {
  const regex = /(https?:\/\/[^\s]+)/g;
  const match = text.match(regex);
  return match ? match[0] : null;
};

const convertUrl = (url, domain) => {
  if (!url || !domain) return '';
  return url.replace(/news\.cscjob\.com/g, domain);
};

const Home = () => {
  const [input, setInput] = useState('');
  const [converted, setConverted] = useState('');
  const [copied, setCopied] = useState(false);
  const [domain, setDomain] = useState('sakhalibkgs.cscjob.com');
  const [shop, setShop] = useState('Ananya Multiservices');
  const [phone, setPhone] = useState('9876543210');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDomain(localStorage.getItem('ananya-domain') || 'sakhalibkgs.cscjob.com');
    setShop(localStorage.getItem('ananya-shop') || 'Ananya Multiservices');
    setPhone(localStorage.getItem('ananya-phone') || '9876543210');
  }, []);

  const handleConvert = () => {
    const url = extractUrl(input);
    if (!url) {
      toast.error('No valid URL found in the text');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const result = convertUrl(url, domain);
      if (result === url) {
        toast.error('Domain not found in URL');
        setIsLoading(false);
        return;
      }
      setConverted(result);
      // Save to history
      const history = JSON.parse(localStorage.getItem('ananya-history') || '[]');
      const newItem = { original: url, converted: result, timestamp: new Date().toISOString() };
      const updated = [newItem, ...history.filter(h => h.timestamp !== newItem.timestamp)];
      if (updated.length > 20) updated.pop();
      localStorage.setItem('ananya-history', JSON.stringify(updated));
      toast.success('URL converted successfully!');
      setIsLoading(false);
    }, 400);
  };

  const copyText = async (text, msg = 'Copied!') => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      toast.success(msg);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast.success(msg);
    }
  };

  const shareText = async (text) => {
    try {
      await navigator.share({ text });
    } catch {
      copyText(text);
    }
  };

  const message = converted 
    ? `📩 New Government Scheme Update\n\n🔗 ${converted}\n\nVisit:\n${shop}\n\n📞 ${phone}`
    : '';

  return (
    <div className="container-responsive">
      <Header />

      {/* Hero Section */}
      <div className="mb-6 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-1">
          <span className="chip">Instant Converter</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient">
          URL Converter
        </h1>
        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
          Convert CSC government scheme links to your portal instantly
        </p>
      </div>

      {/* Input Card */}
      <div className="glass-card p-5 md:p-6 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          <FiLink className="text-purple-500" />
          <span>Paste your URL or message</span>
        </div>
        
        <div className="glass-card-input">
          <textarea
            className="url-input"
            placeholder="Paste WhatsApp message or URL here...\n\nExample: https://news.cscjob.com/view-job?cat_id=1&id=1080&title=dcc"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
          />
        </div>

        <button 
          onClick={handleConvert} 
          className="btn-primary flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FiSend />
              Convert URL
              <FiArrowRight />
            </>
          )}
        </button>
      </div>

      {/* Result Section */}
      {converted && (
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {/* Converted URL */}
          <div className="glass-card p-5 md:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Converted URL</span>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => copyText(converted, 'URL copied!')} 
                  className="icon-btn"
                >
                  {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
                </button>
                <button 
                  onClick={() => shareText(converted)} 
                  className="icon-btn"
                >
                  <FiShare2 />
                </button>
              </div>
            </div>
            <div className="result-url">
              {converted}
            </div>
          </div>

          {/* Generated Message */}
          <div className="glass-card p-5 md:p-6 pulse-glow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📩</span>
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Generated Message</span>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => copyText(message, 'Message copied!')} 
                  className="icon-btn"
                >
                  <FiCopy />
                </button>
                <button 
                  onClick={() => shareText(message)} 
                  className="icon-btn"
                >
                  <FiShare2 />
                </button>
              </div>
            </div>
            <div className="message-box">
              {message}
            </div>
          </div>
        </div>
      )}

      {/* Quick Tip */}
      {!converted && (
        <div className="glass-card p-4 text-center text-sm text-slate-500 dark:text-slate-400 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <span className="text-lg mr-2">💡</span>
          Paste any URL containing <span className="font-mono text-purple-600 dark:text-purple-400">news.cscjob.com</span> to convert it
        </div>
      )}
    </div>
  );
};

export default Home;