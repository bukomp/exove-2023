/**
 * Sleep function that resolves after a specified number of milliseconds
 * @param ms The number of milliseconds to wait
 * @returns A promise that resolves after the specified number of milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { sleep };
