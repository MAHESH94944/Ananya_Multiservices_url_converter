// src/services/historyService.js
const STORAGE_KEY = "ananya-history";

export const getHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addHistoryItem = (item) => {
  const history = getHistory();
  const updated = [
    item,
    ...history.filter((h) => h.timestamp !== item.timestamp),
  ];
  if (updated.length > 20) updated.pop();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const deleteHistoryItem = (timestamp) => {
  const history = getHistory();
  const filtered = history.filter((h) => h.timestamp !== timestamp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
