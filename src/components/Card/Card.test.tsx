import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import characters from '../../helpers/data/potter.json';

describe('Card', () => {
  const data = characters[0];

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

    expect(screen.getByText('Years old:')).toBeDefined();
    expect(screen.getByText('Eye colour:')).toBeDefined();
    expect(screen.getByText('Wand wood:')).toBeDefined();
  });
});
