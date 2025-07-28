/// <reference types="vite/client" />

import { sendToServer } from './send-to-server';

/**
 * Log a message to the console in development mode or send it to the server in production mode.
 * @param  {string} message
 */
// export function log(message) {
export function log(
  message,
  {
    mode = import.meta.env.MODE,
    productionCallback = (level, message) => sendToServer(level, message),
  } = {},
) {
  if (mode !== 'production') {
    console.log(message);
  } else {
    productionCallback('info', message);
  }
}

/**
 * Log a message to the console in development mode or send it to the server in production mode.
 * @param  {string} message
 */
log.warn = function warn(
  message,
  {
    mode = import.meta.env.MODE,
    productionCallback = (level, message) => sendToServer(level, message),
  } = {},
) {
  if (mode !== 'production') {
    console.warn(message);
  } else {
    productionCallback('warn', message);
  }
};

/**
 * Log a message to the console in development mode or send it to the server in production mode.
 * @param  {string} message
 */
log.error = function error(
  message,
  {
    mode = import.meta.env.MODE,
    productionCallback = (level, message) => sendToServer(level, message),
  } = {},
) {
  if (mode !== 'production') {
    console.error(message);
  } else {
    productionCallback('error', message);
  }
};
