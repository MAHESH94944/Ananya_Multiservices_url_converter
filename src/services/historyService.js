const HISTORY_STORAGE_KEY = "csc-smart-share-history";
const HISTORY_LIMIT = 20;

const readHistory = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedHistory = window.localStorage.getItem(HISTORY_STORAGE_KEY);

    if (!storedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(storedHistory);

    return Array.isArray(parsedHistory) ? parsedHistory : [];
  } catch {
    return [];
  }
};

const saveHistory = (history) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
};

const loadHistory = () => readHistory();

const addHistoryEntry = (currentHistory, entry) => {
  const nextEntry = {
    id: `${entry.timestamp}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: entry.timestamp ?? Date.now(),
    originalUrl: entry.originalUrl,
    convertedUrl: entry.convertedUrl,
  };

  const nextHistory = [nextEntry, ...currentHistory].slice(0, HISTORY_LIMIT);
  saveHistory(nextHistory);

  return nextHistory;
};

const clearHistory = () => {
  saveHistory([]);
};

export { HISTORY_STORAGE_KEY, addHistoryEntry, clearHistory, loadHistory };
