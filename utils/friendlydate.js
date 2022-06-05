function formatDate(timestamp) {
  const d = new Date(timestamp);
  console.log(d.toLocaleDateString('en-us', { weekday: 'long' }));

  const df = { weekday:"long", year:"numeric", month:"short", day:"numeric" };
  console.log(d.toLocaleDateString('en-us', df));

  return `${d.toLocaleDateString('en-us', df)}`;
}

module.exports = formatDate;