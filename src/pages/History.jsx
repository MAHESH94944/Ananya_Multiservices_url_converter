import { memo } from "react";
import { FiClock, FiCopy, FiTrash2 } from "react-icons/fi";
import { formatTimestamp } from "../utils/dateFormatter.js";

const History = ({ history, onClearHistory }) => {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            History
          </p>
          <h2 className="serif-heading mt-2 text-3xl font-bold text-white">
            Last 20 converted URLs
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Every conversion is stored locally in your browser with the original
            link, converted link, and timestamp.
          </p>
        </div>

        <button
          type="button"
          onClick={onClearHistory}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-300/20 bg-rose-400/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/20"
        >
          <FiTrash2 />
          Clear history
        </button>
      </div>

      {history.length === 0 ? (
        <div className="flex min-h-[260px] items-center justify-center text-center">
          <div>
            <FiClock className="mx-auto text-4xl text-slate-500" />
            <h3 className="serif-heading mt-4 text-2xl font-bold text-white">
              No conversions yet
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Convert a WhatsApp message on the home page and the result will
              appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          {history.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-lg shadow-black/10"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                      Original URL
                    </p>
                    <p className="mt-1 break-all text-sm text-slate-200">
                      {entry.originalUrl}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">
                      Converted URL
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold text-cyan-100">
                      {entry.convertedUrl}
                    </p>
                  </div>

                  <p className="text-sm text-slate-400">
                    {formatTimestamp(entry.timestamp)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(entry.convertedUrl)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  <FiCopy />
                  Copy converted URL
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default memo(History);
