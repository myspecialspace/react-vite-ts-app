import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import characters from '../../mocks/characters';

describe('Card', () => {
  const data = characters.data[0];

  it('Renders!', () => {
    const component = render(<Card data={data} className="card" />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('img render', () => {
    render(<Card data={data} className="card" />);

    expect(screen.getByRole('img')).toBeDefined();
  });

  it('name render', () => {
    render(<Card data={data} className="card" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeDefined();
  });

  it('some fields render', () => {
    render(<Card data={data} className="card" />);

    expect(screen.getByText('Date of birth:')).toBeDefined();
    expect(screen.getByText('Eye colour:')).toBeDefined();
    expect(screen.getByText('Wands:')).toBeDefined();
  });
});
