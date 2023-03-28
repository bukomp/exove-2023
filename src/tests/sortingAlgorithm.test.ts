import { describe, expect, test } from '@jest/globals';
import { asciiSort2 } from '../sections/section_1/sorting_algorithm';

describe('asciiSort', () => {
  test('sorts an array of words in ASCII order', () => {
    const words = ['cat', 'dog', 'apple', 'banana'];
    const expected = ['dog', 'banana', 'apple', 'cat'];
    const sortedWords = asciiSort2(words);
    expect(sortedWords).toEqual(expected);
  });

  test('handles words with the same third and second characters', () => {
    const words = ['abc', 'bbc', 'cbc', 'dbc', 'ebc'];
    const expected = ['abc', 'bbc', 'cbc', 'dbc', 'ebc'];
    const sortedWords = asciiSort2(words);
    expect(sortedWords).toEqual(expected);
  });

  test('handles words with the same third character', () => {
    const words = ['dea', 'gea', 'jea', 'hea'];
    const expected = ['dea', 'gea', 'hea', 'jea'];
    const sortedWords = asciiSort2(words);
    expect(sortedWords).toEqual(expected);
  });
});
