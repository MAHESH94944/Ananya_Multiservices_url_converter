const generateMessage = (convertedUrl, shopName, phoneNumber) => {
  return `📢 New Government Scheme Update

🔗 ${convertedUrl}

Visit:
${shopName || "Your CSC Portal"}

📞 ${phoneNumber || "N/A"}`;
};

export { generateMessage };
