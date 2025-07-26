import { expect, it, vi, beforeEach, afterEach, describe } from 'vitest';
import { log } from './log';
import { sendToServer } from './send-to-server';

// this isn't great, If I pass in all the deps of the 'log' function w/DI
// then I have control over them and it becomes easier to test

// vi.mock('./send-to-server', () => ({
//   sendToServer: vi.fn(),
// })); // overrides the entire file

describe('logger', () => {
  describe('development', () => {
    it('console.log to the console in dev mode', () => {
      const logSpy = vi.spyOn(console, 'log');
      const mockCallback = vi.fn();

      log('log in dev mode', {
        mode: 'development',
        productionCallback: mockCallback,
      });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(mockCallback).not.toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith('log in dev mode');
    });

    it('console.warn to the console in dev mode', () => {
      const logSpy = vi.spyOn(console, 'warn');
      const mockCallback = vi.fn();

      log.warn('console.warn in dev mode', {
        mode: 'development',
        productionCallback: mockCallback,
      });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('console.warn in dev mode');
      expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it('console.error to the console in dev mode', () => {
      const logSpy = vi.spyOn(console, 'error');
      const mockCallback = vi.fn();

      log.error('console.error in dev mode', {
        mode: 'development',
        productionCallback: mockCallback,
      });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(mockCallback).not.toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith('console.error in dev mode');
    });
  });

  describe.only('production', () => {
    it('does not call console.log in production', () => {
      const logSpy = vi.spyOn(console, 'log');
      const mockCallback = vi.fn();

      log('log in prod mode', {
        mode: 'production',
        productionCallback: mockCallback,
      });

      expect(logSpy).not.toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith('info', 'log in prod mode');
    });

    it('does not call console.warn in production', () => {
      const logSpy = vi.spyOn(console, 'warn');
      const mockCallback = vi.fn();

      log.warn('console.warn in prod mode', {
        mode: 'production',
        productionCallback: mockCallback,
      });

      expect(logSpy).not.toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(
        'warn',
        'console.warn in prod mode',
      );
    });

    it('does not call console.error in production', () => {
      const logSpy = vi.spyOn(console, 'error');
      const mockCallback = vi.fn();

      log.error('console.error in prod mode', {
        mode: 'production',
        productionCallback: mockCallback,
      });

      expect(logSpy).not.toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalled();
      expect(mockCallback).toHaveBeenCalledWith(
        'error',
        'console.error in prod mode',
      );
    });
  });
});
