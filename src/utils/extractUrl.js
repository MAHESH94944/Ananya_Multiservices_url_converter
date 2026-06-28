const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const trimUrl = (value) => value.replace(/[),.\]]+$/g, "");

const extractFirstUrl = (text) => {
  if (!text) {
    return "";
  }

  const matches = text.match(URL_REGEX);

  if (!matches || matches.length === 0) {
    return "";
  }

  return trimUrl(matches[0]);
};

export { URL_REGEX, extractFirstUrl };
