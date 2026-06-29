import { lazy, memo, Suspense, useCallback, useState } from "react";
import toast from "react-hot-toast";
import UrlInput from "../components/UrlInput.jsx";
import { convertUrl } from "../utils/convertUrl.js";
import { extractFirstUrl } from "../utils/extractUrl.js";
import { generateMessage } from "../utils/generateMessage.js";

const ResultCard = lazy(() => import("../components/ResultCard.jsx"));
const MessageCard = lazy(() => import("../components/MessageCard.jsx"));

const sampleMessage = `PM Kisan Registration Started

https://news.cscjob.com/view-job?cat_id=1&id=1080&title=dcc`;

const Home = ({ settings, onConverted }) => {
  const [inputValue, setInputValue] = useState(sampleMessage);
  const [result, setResult] = useState(null);
  const [autoCopiedMessage, setAutoCopiedMessage] = useState("");

  const copyText = useCallback(async (value) => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Copy failed in this browser");
    }
  }, []);

  const shareText = useCallback(
    async (value) => {
      if (!value) {
        return;
      }

      if (navigator.share) {
        try {
          await navigator.share({
            title: "CSC Smart Share",
            text: value,
          });
          return;
        } catch {
          toast.error("Share was cancelled");
          return;
        }
      }

      await copyText(value);
      toast(
        "Sharing is not supported here, so the content was copied instead.",
      );
    },
    [copyText],
  );

  const handleConvert = useCallback(async () => {
    const extractedUrl = extractFirstUrl(inputValue);

    if (!extractedUrl) {
      toast.error("Paste a WhatsApp message or a URL first");
      return;
    }

    if (!settings.domain) {
      toast.error("Save your personal domain in the sidebar first");
      return;
    }

    const convertedUrl = convertUrl(extractedUrl, settings.domain);

    if (!convertedUrl) {
      toast.error("Only news.cscjob.com links can be converted");
      return;
    }

    const generatedMessage = generateMessage(
      convertedUrl,
      settings.shopName,
      settings.phone,
    );
    const timestamp = Date.now();

    try {
      await navigator.clipboard.writeText(generatedMessage);
      setAutoCopiedMessage(generatedMessage);
      toast.success("Message copied to clipboard");
    } catch {
      setAutoCopiedMessage("");
      toast.success("URL converted");
      toast.error("Auto-copy failed in this browser");
    }

    setResult({
      originalUrl: extractedUrl,
      convertedUrl,
      message: generatedMessage,
      timestamp,
    });

    onConverted({
      originalUrl: extractedUrl,
      convertedUrl,
      timestamp,
    });
  }, [
    inputValue,
    onConverted,
    settings.domain,
    settings.phone,
    settings.shopName,
  ]);

  const handleClear = useCallback(() => setInputValue(""), []);

  const handleUseSample = useCallback(() => setInputValue(sampleMessage), []);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <div className="p-4 sm:p-5">
          <UrlInput
            value={inputValue}
            onChange={setInputValue}
            onConvert={handleConvert}
            onClear={handleClear}
            onUseSample={handleUseSample}
          />
        </div>
      </section>

      {result ? (
        <Suspense
          fallback={
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-40 rounded-full bg-white/10" />
                <div className="h-4 w-56 rounded-full bg-white/10" />
                <div className="h-28 rounded-3xl bg-white/10" />
              </div>
            </section>
          }
        >
          <ResultCard
            convertedUrl={result.convertedUrl}
            originalUrl={result.originalUrl}
            onCopy={copyText}
            onShare={shareText}
            autoCopied={autoCopiedMessage === result.message}
          />
          <MessageCard
            message={result.message}
            onCopy={copyText}
            onShare={shareText}
          />
        </Suspense>
      ) : (
        <section className="rounded-[2rem] border border-dashed border-white/15 bg-white/5 p-6 text-center shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-8">
          <h2 className="serif-heading text-2xl font-bold text-white sm:text-3xl">
            Your converted link will appear here
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Paste a message and tap convert.
          </p>
        </section>
      )}
    </div>
  );
};

export default memo(Home);
