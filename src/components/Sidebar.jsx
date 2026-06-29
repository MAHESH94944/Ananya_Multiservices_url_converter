import { memo } from "react";
import { FiClock, FiHome } from "react-icons/fi";
import Settings from "../pages/Settings.jsx";

const Sidebar = ({ activeView, onNavigate, settings, onSaveSettings }) => {
  return (
    <section className="space-y-4">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          Quick actions
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              activeView === "home"
                ? "border-orange-300/40 bg-orange-400/20 text-orange-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FiHome />
            Convert
          </button>
          <button
            type="button"
            onClick={() => onNavigate("history")}
            className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              activeView === "history"
                ? "border-orange-300/40 bg-orange-400/20 text-orange-100"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
            }`}
          >
            <FiClock />
            History
          </button>
        </div>
      </div>

      <Settings settings={settings} onSave={onSaveSettings} compact />
    </section>
  );
};

export default memo(Sidebar);
