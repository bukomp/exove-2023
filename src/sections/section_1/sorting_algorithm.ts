const asciiSort1 = (words: string[]): string[] => {
  return words.sort((a, b) => {
    const a1 = a.charCodeAt(2);
    const b1 = b.charCodeAt(2);
    if (a1 === b1) {
      const a2 = a.charCodeAt(1);
      const b2 = b.charCodeAt(1);
      if (a2 === b2) {
        const a3 = a.charCodeAt(0);
        const b3 = b.charCodeAt(0);
        return a3 - b3;
      } else {
        return a2 - b2;
      }
    } else {
      return a1 - b1;
    }
  });
};

const asciiSort2 = (words: string[]): string[] => {
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

export { asciiSort1, asciiSort2 };
