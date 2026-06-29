// src/context/AppContext.jsx
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { getHistory, addHistoryItem, clearHistory, deleteHistoryItem } from '../services/historyService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [userDomain, setUserDomain] = useState(() => localStorage.getItem('ananya-domain') || 'sakhalibkgs.cscjob.com');
  const [shopName, setShopName] = useState(() => localStorage.getItem('ananya-shop') || 'Ananya Multiservices');
  const [phone, setPhone] = useState(() => localStorage.getItem('ananya-phone') || '9876543210');

  // load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const addHistory = (original, converted) => {
    const item = { original, converted, timestamp: new Date().toISOString() };
    addHistoryItem(item);
    setHistory(getHistory());
  };

  const clearAllHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const deleteItem = (timestamp) => {
    deleteHistoryItem(timestamp);
    setHistory(getHistory());
  };

  const updateSettings = (domain, shop, phoneNum) => {
    setUserDomain(domain);
    setShopName(shop);
    setPhone(phoneNum);
    localStorage.setItem('ananya-domain', domain);
    localStorage.setItem('ananya-shop', shop);
    localStorage.setItem('ananya-phone', phoneNum);
  };

  const value = useMemo(() => ({
    history,
    addHistory,
    clearAllHistory,
    deleteItem,
    userDomain,
    shopName,
    phone,
    updateSettings,
  }), [history, userDomain, shopName, phone]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);