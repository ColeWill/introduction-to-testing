import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Counter } from './counter';

import '@testing-library/jest-dom/vitest';

describe('Counter ', () => {
  it('renders with an initial count of 0', () => {
    render(<Counter />);
    const counter = screen.getByTestId('counter-count');
    console.log(counter.textContent);
    expect(counter).toHaveTextContent('0');
  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    render(<Counter />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    const incrementButton = screen.getByRole('button', { name: /increment/i });

    expect(decrementButton).toBeDisabled();
    expect(incrementButton).not.toBeDisabled();
  });

  it('displays "days" when the count is 0', () => {
    render(<Counter />);
    const counterUnit = screen.getByTestId('counter-unit');
    expect(counterUnit.textContent.toLowerCase()).toBe('days');
  });

  it('increments the count when the "Increment" button is clicked', async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const counter = screen.getByTestId('counter-count');

    // await userEvent.click(incrementButton);

    // test helper, allows dom stuff to finalize before running code
    await act(async () => {
      await userEvent.click(incrementButton);
    });

    expect(counter).toHaveTextContent('1');
  });

  it('displays "day" when the count is 1', async () => {
    render(<Counter />);
    const counter = screen.getByTestId('counter-count');
    const incrementButton = screen.getByRole('button', { name: /increment/i });

    await act(async () => {
      await userEvent.click(incrementButton);
    });

    expect(counter).toHaveTextContent('1');
  });

  it('decrements the count when the "Decrement" button is clicked', async () => {
    render(<Counter />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    const incrementButton = screen.getByRole('button', { name: /increment/i });
    const count = screen.getByTestId('counter-count');

    await act(async () => {
      await userEvent.dblClick(incrementButton);
    });

    const initialCount = count.textContent;

    expect(count.textContent).toBe('2');

    await act(async () => {
      await userEvent.click(decrementButton);
    });

    const currentCount = Number(count.textContent);

    expect(Number(initialCount)).toBeGreaterThan(currentCount);
  });

  it('does not allow decrementing below 0', async () => {
    render(<Counter initialCount={1} />);
    const count = screen.getByTestId('counter-count');
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    const initialCount = Number(count.textContent);

    expect(initialCount).toBe(1);

    await act(async () => {
      await userEvent.dblClick(decrementButton);
    });

    expect(Number(count.textContent)).toBe(0);
  });

  it('resets the count when the "Reset" button is clicked', async () => {
    const { getByTestId, getByRole } = render(<Counter initialCount={2} />);
    const count = getByTestId('counter-count');
    const resetButton = getByRole('button', { name: /reset/i });

    expect(Number(count.textContent)).toBe(2);

    await act(async () => {
      await userEvent.click(resetButton);
    });

    expect(count.textContent).toBe('0');
  });

  it('disables the "Decrement" and "Reset" buttons when the count is 0', () => {
    render(<Counter />);
    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });

    expect(decrementButton).toBeDisabled();
    expect(resetButton).toBeDisabled();
  });

  it('updates the document title based on the count', async () => {
    render(<Counter />);
    const incrementButton = screen.getByRole('button', { name: /increment/i });

    await act(async () => {
      await userEvent.click(incrementButton);
    });
    // document is from HappyDOM
    expect(document.title).toEqual(expect.stringContaining('1 day'));
  });
});
