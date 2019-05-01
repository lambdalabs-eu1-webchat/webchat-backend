const capitalizeLetters = str => {
  return str.toLowerCase().replace(/\b([a-z])/gi, char => char.toUpperCase());
};

module.exports = capitalizeLetters;
