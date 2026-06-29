// src/utils/extractUrl.js
export const extractUrl = (text) => {
  if (!text) return null;
  const regex = /(https?:\/\/[^\s]+)/g;
  const match = text.match(regex);
  return match ? match[0] : null;
};