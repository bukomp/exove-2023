import { cloneDeep } from 'lodash';

/**
 * Sleep function that resolves after a specified number of milliseconds
 * @param ms The number of milliseconds to wait
 * @returns A promise that resolves after the specified number of milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const replaceSpacesWithUnderscores = (obj: any): any => {
  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let newKey = key.replace(/ /g, '_');

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[newKey] = replaceSpacesWithUnderscores(obj[key]);
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
};

export { sleep, replaceSpacesWithUnderscores };
