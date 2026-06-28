import { memo } from "react";
import { FiCopy, FiExternalLink, FiShare2 } from "react-icons/fi";

const ResultCard = ({
  convertedUrl,
  originalUrl,
  onCopy,
  onShare,
  autoCopied,
}) => {
  return (
    <section className="rounded-[2rem] border border-cyan-300/15 bg-cyan-400/10 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="serif-heading mt-1 text-2xl font-bold text-white">
            Your converted portal link
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Your new link is ready to use.
          </p>
          {autoCopied ? (
            <p className="mt-3 inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              Message copied to clipboard
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onCopy(convertedUrl)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/15"
          >
            <FiCopy />
            Copy URL
          </button>
          <button
            type="button"
            onClick={() => onShare(convertedUrl)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/25"
          >
            <FiShare2 />
            Share URL
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Original URL
          </p>
          <a
            href={originalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 break-all text-sm text-slate-300 transition hover:text-white"
          >
            {originalUrl}
            <FiExternalLink />
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">
            Converted URL
          </p>
          <a
            href={convertedUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 break-all text-base font-semibold text-cyan-100 transition hover:text-white"
          >
            {convertedUrl}
            <FiExternalLink />
          </a>
        </div>
      </div>
    </section>
  );
};

export default memo(ResultCard);
