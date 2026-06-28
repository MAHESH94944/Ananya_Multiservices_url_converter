import { memo } from "react";
import { FiCopy, FiShare2 } from "react-icons/fi";

const MessageCard = ({ message, onCopy, onShare }) => {
  return (
    <section className="rounded-[2rem] border border-emerald-300/15 bg-emerald-400/10 p-5 shadow-2xl shadow-emerald-950/20 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200/80">
            Message generator
          </p>
          <h2 className="serif-heading mt-1 text-2xl font-bold text-white">
            Ready-to-send WhatsApp message
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Copy or share the full update with your shop details included.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onCopy(message)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/15"
          >
            <FiCopy />
            Copy Message
          </button>
          <button
            type="button"
            onClick={() => onShare(message)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/15 px-4 py-2 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-300/25"
          >
            <FiShare2 />
            Share Message
          </button>
        </div>
      </div>

      <pre className="mt-5 whitespace-pre-wrap rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-200">
        {message}
      </pre>
    </section>
  );
};

export default memo(MessageCard);
