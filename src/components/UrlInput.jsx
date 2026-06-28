import { memo } from "react";
import { FiArrowRight, FiStar, FiTrash2 } from "react-icons/fi";

const UrlInput = ({ value, onChange, onConvert, onClear, onUseSample }) => {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="serif-heading text-2xl font-bold text-white">
            Paste your WhatsApp update here
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            We’ll create your portal link and copy it automatically.
          </p>
        </div>

        <button
          type="button"
          onClick={onUseSample}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-300/30 bg-orange-400/15 px-4 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-400/25"
        >
          <FiStar />
          Try example
        </button>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-slate-300">
          Message or link
        </span>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={9}
          placeholder="Paste a WhatsApp update with the CSC link here..."
          className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-base text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-300/40 focus:bg-white/8 focus:ring-4 focus:ring-orange-400/10"
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          Paste the full message or just the link.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <FiTrash2 />
            Clear
          </button>
          <button
            type="button"
            onClick={onConvert}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-orange-900/30 transition hover:scale-[1.01]"
          >
            Convert
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default memo(UrlInput);
