import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import CharacterForm from './CharacterForm';
import { customRender } from '../../test/utils';

describe('CharacterForm', () => {
  it('Renders!', () => {
    const component = customRender(<CharacterForm />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('Notification', () => {
    const component = customRender(<CharacterForm />);
    expect(component.queryByText(/Changes saved/i)).toBeNull();
  });

  it('form controls render', () => {
    customRender(<CharacterForm />);
    expect(screen.getByPlaceholderText('Character full name')).toBeDefined();
    expect(screen.getByPlaceholderText('Born')).toBeDefined();
    expect(screen.getByRole('radio', { name: 'Male' })).toBeDefined();
    expect(screen.getByRole('radio', { name: 'Female' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'human' })).toBeDefined();
    expect(screen.getByRole('option', { name: 'Gryffindor' })).toBeDefined();
    expect(screen.getByRole('button')).toBeDefined();
  });
});
