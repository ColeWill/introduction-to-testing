import { fireEvent, screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { createButton } from './button.js';

describe('createButton', () => {

  afterEach(()=> {
    document.body.innerHTML = "";
  })

  it('should create a button element', () => {
    // const button = createButton();
    document.body.appendChild(createButton());

    const button = screen.getByRole('button', {name: 'Click Me'});

    expect(button).toBeInTheDocument();
  });

  it('should have the text "Click Me"', () => {
    const button = createButton();

    expect(button.textContent.toLowerCase()).toBe('click me');
  });

  it('should change the text to "Clicked!" when clicked', async () => {
    document.body.appendChild(createButton());

    const button = screen.getByRole('button', {name: 'Click Me'});

    // fireEvent(button, new MouseEvent('click'))

    await userEvent.click(button);

    expect(button.textContent.toLowerCase()).toBe('clicked!')
  });
});
