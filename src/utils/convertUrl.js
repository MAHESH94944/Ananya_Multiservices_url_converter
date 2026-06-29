// src/utils/convertUrl.js
export const convertUrl = (url, userDomain) => {
  if (!url || !userDomain) return '';
  return url.replace(/news\.cscjob\.com/g, userDomain);
};