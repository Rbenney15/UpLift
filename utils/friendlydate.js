function formatDate(timestamp) {
  const d = new Date(timestamp);

  const df = { weekday:"long", year:"numeric", month:"short", day:"numeric" };

  return `${d.toLocaleDateString('en-us', df)}`;
}

module.exports = formatDate;
