import words from "./valid_words.json";

export const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const show = ["d", "e", "f"];

function get_available_letters(word_a: string, word_b: string): string[] {
  if (!word_a || !word_b) {
    return alphabet;
  }

  const letters: string[] = [];
  const larger_word = word_a.length >= word_b.length ? word_a : word_b;
  const other_word = word_a.length >= word_b.length ? word_b : word_a;

  console.log({ larger_word, other_word });

  for (const larger_lett of larger_word) {
    let other_lett = other_word[larger_word.indexOf(larger_lett)];

    if (other_lett == larger_lett) {
      continue;
    }

    let larger_lett_index = alphabet.indexOf(larger_lett);
    let other_lett_index = alphabet.indexOf(other_lett);

    let larger_alpha_index =
      larger_lett_index >= other_lett_index
        ? larger_lett_index
        : other_lett_index;
    let smaller_alpha_index =
      larger_lett_index >= other_lett_index
        ? other_lett_index
        : larger_lett_index;

    alphabet.forEach((lett, i) => {
      if (i >= smaller_alpha_index && i <= larger_alpha_index) {
        letters.push(lett);
      }
    });

    if (other_lett != larger_lett) {
      break;
    }
  }

  return Array.from(letters);
}

export { get_available_letters };
