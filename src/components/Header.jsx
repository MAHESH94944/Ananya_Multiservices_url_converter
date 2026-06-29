import { memo } from "react";
const Header = () => {
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
      </div>
    </header>
  );
};

export default memo(Header);
