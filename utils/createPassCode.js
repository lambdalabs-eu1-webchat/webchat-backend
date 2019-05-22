module.exports = () => {
  let temp = '';
  const characters = process.env.CHARACTERS;

  // We will choose a random character this many times.
  for (let x = 0; x < 10; x++) {
    // Generate a random number from 0 to 1
    const randomNumber = Math.random();

    // Multiply by the number of characters in our list.
    const randomFloatingIndex = randomNumber * characters.length;

    // Round this index down because indices are whole numbers that start at 0.
    const randomIndex = Math.floor(randomFloatingIndex);

    // Get the character at this random index.
    const randomCharacter = characters.charAt(randomIndex);

    // Append that character to our password-in-the-making.
    temp += randomCharacter;
  }

  // Return our password
  return temp;
};
