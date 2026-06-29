import { lazy, Suspense, useCallback, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import {
  addHistoryEntry,
  clearHistory,
  loadHistory,
} from "./services/historyService.js";

const History = lazy(() => import("./pages/History.jsx"));

const defaultSettings = {
  domain: "",
  shopName: "",
  phone: "",
};

const views = {
  home: "home",
  history: "history",
};

const App = () => {
  const [activeView, setActiveView] = useState(views.home);
  const [settings, setSettings] = useLocalStorage(
    "csc-smart-share-settings",
    defaultSettings,
  );
  const [history, setHistory] = useState(() => loadHistory());

  const handleSaveSettings = useCallback(
    (nextSettings) => setSettings(nextSettings),
    [setSettings],
  );

  const handleConverted = useCallback((entry) => {
    setHistory((currentHistory) => addHistoryEntry(currentHistory, entry));
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  const renderActivePage = () => {
    if (activeView === views.history) {
      return (
        <Suspense
          fallback={
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-32 rounded-full bg-white/10" />
                <div className="h-8 w-64 rounded-full bg-white/10" />
                <div className="h-32 rounded-3xl bg-white/10" />
                <div className="h-32 rounded-3xl bg-white/10" />
              </div>
            </section>
          }
        >
          <History history={history} onClearHistory={handleClearHistory} />
        </Suspense>
      );
    }

    return <Home settings={settings} onConverted={handleConverted} />;
  };

  return (
    <div className="min-h-screen text-slate-100">
      <Header activeView={activeView} onNavigate={setActiveView} />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:grid-cols-[minmax(0,1.2fr)_380px] 2xl:grid-cols-[minmax(0,1.25fr)_420px]">
        <main className="min-w-0">{renderActivePage()}</main>

        <aside className="space-y-4 xl:sticky xl:top-28 xl:self-start">
          <Sidebar
            activeView={activeView}
            onNavigate={setActiveView}
            settings={settings}
            onSaveSettings={handleSaveSettings}
          />
        </aside>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#e2e8f0",
            border: "1px solid rgba(148, 163, 184, 0.2)",
          },
        }}
      />
    </div>
  );
};

export default App;
