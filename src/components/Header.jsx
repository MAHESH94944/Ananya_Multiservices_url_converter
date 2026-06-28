import { memo } from "react";
import { FiClock, FiHome } from "react-icons/fi";

const navigationItems = [
  { id: "home", label: "Convert", icon: FiHome },
  { id: "history", label: "History", icon: FiClock },
];

const Header = ({ activeView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-orange-300/80">
              CSC Smart Share
            </p>
            <h1 className="serif-heading text-xl font-bold text-white sm:text-2xl">
              Turn government scheme links into your own portal link
            </h1>
            <p className="max-w-2xl text-sm text-slate-300">
              Paste a message, tap convert, and get your own portal link
              instantly.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-orange-300/40 bg-orange-400/20 text-orange-100 shadow-lg shadow-orange-900/20"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="text-base" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);
