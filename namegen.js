import { fakerIT, fakerEN } from "@faker-js/faker";

/**
 * Generate a number from a string
 * @param {string} word
 * @returns {number}
 */
const numberSeedGenerator = (word) => {
  let nameSeed = 0;
  for (let idx = 0; idx < word.length; idx++) {
    nameSeed += word.charCodeAt(idx) * 10 ** idx;
  }
  return nameSeed;
};

/**
 * Generate an italian full person name from a text seed
 * @param {string} textSeed
 * @returns {string}
 */
export const generateItalianFullnameByStringSeed = (textSeed) => {
  const seed = numberSeedGenerator(textSeed);
  fakerIT.seed(seed);
  return fakerIT.person.fullName();
};

/**
 * Generate an english funny noun adjective from a text seed
 * @param {string} textSeed
 * @returns {string}
 */
export const generateEnglishNounAdjectiveByStringSeed = (textSeed) => {
  const seed = numberSeedGenerator(textSeed);
  fakerEN.seed(seed);
  return `${fakerEN.word.noun()} ${fakerEN.word.adjective()}`;
};
