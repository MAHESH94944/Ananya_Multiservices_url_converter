import { useEffect, useState } from "react";

const readStoredValue = (key, defaultValue) => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (storedValue === null) {
      return defaultValue;
    }

    return JSON.parse(storedValue);
  } catch {
    return defaultValue;
  }
};

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => readStoredValue(key, defaultValue));

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
