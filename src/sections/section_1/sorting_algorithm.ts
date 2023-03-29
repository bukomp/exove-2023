const asciiSort = (words: string[]): string[] => {
  return words.sort((a, b) => {
    const [a3, a2, a1] = a;
    const [b3, b2, b1] = b;
    if (a1 === b1) {
      if (a2 === b2) {
        return a3.charCodeAt(0) - b3.charCodeAt(0);
      } else {
        return a2.charCodeAt(0) - b2.charCodeAt(0);
      }
    } else {
      return a1.charCodeAt(0) - b1.charCodeAt(0);
    }
  });
};

const asciiSortFromScratch = (words: string[]): string[] => {
  let n = words.length;
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      // extract the ASCII codes of the first three letters of each word
      const [a3, a2, a1] = words[i];
      const [b3, b2, b1] = words[i + 1];
      if (a1 !== b1) {
        // compare the ASCII code of the third letter
        if (a1.charCodeAt(0) > b1.charCodeAt(0)) {
          [words[i], words[i + 1]] = [words[i + 1], words[i]];
          swapped = true;
        }
      } else if (a2 !== b2) {
        // compare the ASCII code of the second letter
        if (a2.charCodeAt(0) > b2.charCodeAt(0)) {
          [words[i], words[i + 1]] = [words[i + 1], words[i]];
          swapped = true;
        }
      } else {
        // compare the ASCII code of the first letter
        if (a3.charCodeAt(0) > b3.charCodeAt(0)) {
          [words[i], words[i + 1]] = [words[i + 1], words[i]];
          swapped = true;
        }
      }
    }
    n--; // optimize loop by reducing the length of the array each time
  } while (swapped); // repeat the loop if a swap occurred during the last pass
  return words;
};

export { asciiSort, asciiSortFromScratch };
