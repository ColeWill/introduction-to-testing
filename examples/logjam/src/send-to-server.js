/**
 *
 * @param {'info' | 'error' | 'warn'} level
 * @param {string} message
 */
export const sendToServer = (level, message) => {
  throw new Error('This code should not run at all!');
  return `You must mock this function: sendToServer(${level}, ${message})`;
};
