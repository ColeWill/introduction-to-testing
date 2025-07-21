import { test, expect } from 'vitest';

test('a super simple test', () => {
  throw new Error('Im being thrown')
  expect(true).toBe(true);
});
