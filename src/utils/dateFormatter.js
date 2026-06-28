const formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
};

export { formatTimestamp };
