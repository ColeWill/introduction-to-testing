import { expect, it, vi, beforeEach, afterEach, describe } from 'vitest';
import { log } from './log';
import { sendToServer } from './send-to-server';

vi.mock('./send-to-server', () => ({
  sendToServer: vi.fn(),
})); // overrides the entire file

describe('logger', () => {
  describe('development', () => {
    beforeEach(() => {
      vi.stubEnv('MODE', 'development');
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('logs to the console in dev mode', () => {
      const logSpy = vi.spyOn(console, 'log');

      log('hey');

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('hey');
    });
  });

  describe('production', () => {
    beforeEach(() => {
      vi.stubEnv('MODE', 'production');
    });
    afterEach(() => {
      vi.restoreAllMocks();
    });
    it('does not call console.log in production', () => {
      const logSpy = vi.spyOn(console, 'log');
      log('hey again');

      expect(logSpy).not.toHaveBeenCalled();
      expect(sendToServer).toHaveBeenCalled();
    });
  });
});
