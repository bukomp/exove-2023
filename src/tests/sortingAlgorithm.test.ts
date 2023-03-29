import { describe, expect, test } from '@jest/globals';
import {
  asciiSort,
  asciiSortFromScratch,
} from '../sections/section_1/sorting_algorithm';

describe('Test sorting function that was written from scratch and utilizes only basic logic', () => {
  test('sorts an array of words in ASCII order', () => {
    const words = ['cat', 'dog', 'apple', 'banana'];
    const expected = ['dog', 'banana', 'apple', 'cat'];
    const sortedWords = asciiSortFromScratch(words);
    expect(sortedWords).toEqual(expected);
  });

  test('handles words with the same third and second characters', () => {
    const words = ['abc', 'bbc', 'cbc', 'dbc', 'ebc'];
    const expected = ['abc', 'bbc', 'cbc', 'dbc', 'ebc'];
    const sortedWords = asciiSortFromScratch(words);
    expect(sortedWords).toEqual(expected);
  });

  test('handles words with the same third character', () => {
    const words = ['dea', 'gea', 'jea', 'hea'];
    const expected = ['dea', 'gea', 'hea', 'jea'];
    const sortedWords = asciiSortFromScratch(words);
    expect(sortedWords).toEqual(expected);
  });
});

describe('Test sorting function that utilizes JS sort function', () => {
  test('sorts an array of words in ASCII order', () => {
    const words = ['cat', 'dog', 'apple', 'banana'];
    const expected = ['dog', 'banana', 'apple', 'cat'];
    const sortedWords = asciiSort(words);
    expect(sortedWords).toEqual(expected);
  });

  test('handles words with the same third and second characters', () => {
    const words = ['abc', 'bbc', 'cbc', 'dbc', 'ebc'];
    const expected = ['abc', 'bbc', 'cbc', 'dbc', 'ebc'];
    const sortedWords = asciiSort(words);
    expect(sortedWords).toEqual(expected);
  });

  test('handles words with the same third character', () => {
    const words = ['dea', 'gea', 'jea', 'hea'];
    const expected = ['dea', 'gea', 'hea', 'jea'];
    const sortedWords = asciiSort(words);
    expect(sortedWords).toEqual(expected);
  });
});
