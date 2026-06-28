const CSC_NEWS_HOST = "news.cscjob.com";

const normalizeDomainInput = (domain) => {
  if (!domain) {
    return "";
  }

  return domain
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/$/, "")
    .replace(/\/.*$/, "");
};

const convertUrl = (sourceUrl, domain) => {
  const normalizedDomain = normalizeDomainInput(domain);

  if (!sourceUrl || !normalizedDomain) {
    return "";
  }

  try {
    const parsedUrl = new URL(sourceUrl);

    if (parsedUrl.hostname !== CSC_NEWS_HOST) {
      return "";
    }

    parsedUrl.hostname = normalizedDomain;

    return parsedUrl.toString();
  } catch {
    return "";
  }
};

export { CSC_NEWS_HOST, convertUrl, normalizeDomainInput };
