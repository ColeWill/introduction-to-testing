import { test, expect, vi } from 'vitest';

// mock - a function that is a placeholder for something else
// spies - keeps what you have, but wraps it so that you can spy on what is happening inside

const logSpy = vi.spyOn(console, 'log');

test('a super simple test', () => {
  console.log('Hello World!');

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledWith('Hello World!');
  expect(logSpy).toHaveBeenCalledOnce();
  expect(logSpy).toHaveBeenCalledTimes(1);
});

test('another simple test for mocks', () => {
  const mockFn = vi.fn();

  mockFn('Hello World!');

  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toBeCalledWith('Hello World!');
  expect(mockFn).toBeCalledTimes(1);
  expect(mockFn).toHaveBeenCalledOnce();
});

// Now whenever Math.random() is called I have
// overwritten it's return value for my entire suite
const randomSpy = vi.spyOn(Math, 'random').mockImplementation(() => 0.5);

test('a third simple test for spying on stuff', () => {
  const random = Math.random();
  expect(random).toBe(0.5);
});
