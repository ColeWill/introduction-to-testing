/**
 *
 * @param {'info' | 'error' | 'warn'} level
 * @param {string} message
 */
export const sendToServer = (level, message) => {
  throw new Error(
    'This code should not run at all!, will mock this fn in the tests',
  );
  return `You must mock this function: sendToServer(${level}, ${message})`;
};
