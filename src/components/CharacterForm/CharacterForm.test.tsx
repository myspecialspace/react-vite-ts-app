import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterForm from './CharacterForm';

describe('CharacterForm', () => {
  it('Renders!', () => {
    const component = render(<CharacterForm />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('Notification', () => {
    const component = render(<CharacterForm />);
    expect(component.queryByText(/Изменения сохранены/i)).toBeNull();
  });

  it('form controls render', () => {
    render(<CharacterForm />);
    expect(screen.getByRole('textbox', { name: '' })).toBeDefined();
    expect(screen.getByRole('radio', { name: 'Male' })).toBeDefined();
    expect(screen.getByRole('radio', { name: 'Female' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'human' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'Gryffindor' })).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });

  // it('submit empty form has validation error', () => {
  //   const component = render(<CharacterForm />);

  //   const button = component.getByText(/submit/i);
  //   fireEvent.click(button);

  //   expect(screen.getByText(/Обязательное поле/)).toBeDefined();
  // });
});
