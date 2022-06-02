const formatEntry = (content) => {
  const sets = content.set_count? `${content.set_count} sets` : '';
  const reps = content.rep_count? `${content.rep_count} reps` : '';
  const rest = content.rest? `rest for ${content.rest}` : '';

  const entry = [sets, reps, content.weight, rest, content.effort].filter(Boolean).join(', ');
  
  return entry;
};

module.exports = formatEntry;