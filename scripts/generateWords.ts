// load wiki word list txt file
import fs from "fs";
let wikiWords = fs.readFileSync("scripts/wiki_word_list.txt", "utf8").split(
  "\n",
);

wikiWords = wikiWords
  .map((word) => word.trim()) // remove whitespace
  .filter((word) => word.length > 0) // remove empty strings
  .map((word) => word.toLowerCase()); // convert to lowercase

wikiWords = [...new Set(wikiWords)]; // remove duplicates

// structure words into object by first letter
const wordsByFirstLetter = wikiWords.reduce((acc, word) => {
  const firstLetter = word[0];
  if (!acc[firstLetter]) {
    acc[firstLetter] = [];
  }
  acc[firstLetter].push(word);
  return acc;
}, {} as { [key: string]: string[] });

// write each letter to a file named after the letter
Object.keys(wordsByFirstLetter).forEach((letter) => {
  fs.writeFileSync(
    `public/words/${letter}.json`,
    JSON.stringify(wordsByFirstLetter[letter]),
  );
});

console.log(wordsByFirstLetter);

export {};
