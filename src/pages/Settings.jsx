import { memo, useState } from "react";
import toast from "react-hot-toast";
import { normalizeDomainInput } from "../utils/convertUrl.js";

const Settings = ({ settings, onSave, compact = false }) => {
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextSettings = {
      domain: normalizeDomainInput(formData.domain),
      shopName: formData.shopName.trim(),
      phone: formData.phone.trim(),
    };

    onSave(nextSettings);
    setFormData(nextSettings);
    toast.success("Settings saved in your browser");
  };

  return (
    <section className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="serif-heading mt-2 text-2xl font-bold text-white">
            {compact
              ? "Your shop details"
              : "Save your personal CSC portal details"}
          </h2>
          {!compact ? (
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Add these details once.
            </p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Keep this updated so your links use the right domain.
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Personal domain
          </span>
          <input
            type="text"
            value={formData.domain}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                domain: event.target.value,
              }))
            }
            placeholder="sakhalibkgs.cscjob.com"
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-300/40 focus:bg-white/8 focus:ring-4 focus:ring-orange-400/10"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Shop name
          </span>
          <input
            type="text"
            value={formData.shopName}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                shopName: event.target.value,
              }))
            }
            placeholder="Ananya Multiservices"
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-300/40 focus:bg-white/8 focus:ring-4 focus:ring-orange-400/10"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Phone number
          </span>
          <input
            type="tel"
            value={formData.phone}
            onChange={(event) =>
              setFormData((current) => ({
                ...current,
                phone: event.target.value,
              }))
            }
            placeholder="9552319904"
            className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-300/40 focus:bg-white/8 focus:ring-4 focus:ring-orange-400/10"
          />
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-amber-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-orange-900/30 transition hover:scale-[1.01]"
        >
          Save settings
        </button>
      </form>

      <div className="mt-4 rounded-3xl border border-emerald-300/15 bg-emerald-400/10 p-4 text-sm text-emerald-50">
        <p className="font-semibold">Saved values</p>
        <p className="mt-2 break-all">
          Domain: {settings.domain || "Not saved yet"}
        </p>
        <p className="mt-1 break-all">
          Shop: {settings.shopName || "Not saved yet"}
        </p>
        <p className="mt-1 break-all">
          Phone: {settings.phone || "Not saved yet"}
        </p>
      </div>
    </section>
  );
};

export default memo(Settings);
