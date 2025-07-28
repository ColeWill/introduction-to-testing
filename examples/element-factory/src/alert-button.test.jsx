import { render, screen, act, getByLabelText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AlertButton } from './alert-button';

describe('AlertButton', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('should render an alert button', async () => {
    render(<AlertButton />);
    const input = screen.queryByText(/message/i);
    const button = screen.getByRole('button', { name: /trigger alert/i });

    expect(input).toBeInTheDocument();
    expect(input).toHaveTextContent('Message');
    expect(button).toBeInTheDocument();
  });

  it('should trigger an alert', async () => {
    // the alert method belongs to window.alert, and HAS to be spied on to not throw an error
    const alertSpy = vi.spyOn(window, 'alert');
    render(<AlertButton />);
    const input = screen.getByLabelText(/message/i);
    const button = screen.getByRole('button', { name: /trigger alert/i });
    const user = userEvent.setup();

    await user.click(button);

    expect(alertSpy).toHaveBeenCalledOnce();
    expect(alertSpy).toHaveBeenCalledWith('Alert!');
  });

  it('should trigger an alert, refactored with DI', async () => {
    const handleSubmit = vi.fn();
    render(<AlertButton onSubmit={handleSubmit} message={'default message'} />);
    const input = screen.getByLabelText(/message/i);
    const button = screen.getByRole('button', { name: /trigger alert/i });
    const user = userEvent.setup();

    expect(input.value).toBe('Alert!');

    await act(async () => {
      await user.clear(input);
      await user.type(input, 'orca whale');
      await user.click(button);
    });

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('orca whale');
  });

  it("should trigger an alert with the user's text after the input is cleared", async () => {
    const alertSpy = vi.spyOn(window, 'alert');
    render(<AlertButton />);
    const input = screen.getByLabelText(/message/i);
    const button = screen.getByRole('button', { name: /trigger alert/i });
    const user = userEvent.setup();

    await act(async () => {
      await user.clear(input);
      await user.type(input, 'Hello');
      await user.click(button);
    });

    expect(alertSpy).toHaveBeenCalledOnce();
    expect(alertSpy).toHaveBeenCalledWith('Hello');
  });
});
