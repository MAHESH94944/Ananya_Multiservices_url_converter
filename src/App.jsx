// src/App.jsx
import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BottomNav from './components/BottomNav';

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('ananya-theme') === 'dark';
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ananya-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="spinner" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings toggleTheme={() => setDark(!dark)} dark={dark} />} />
        </Routes>
      </Suspense>
      <BottomNav />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            borderRadius: '1rem',
            padding: '12px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255,255,255,0.3)',
          },
          success: {
            iconTheme: { primary: '#7c3aed', secondary: 'white' },
          },
        }}
      />
    </div>
  );
}

export default App;