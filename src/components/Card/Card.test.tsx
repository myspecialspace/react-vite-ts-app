import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import Card from './Card';
import characters from '../../mocks/characters';
import { customRender } from '../../test/utils';

describe('Card', () => {
  const data = characters.data[0];

  it('Renders!', () => {
    const component = customRender(<Card data={data} className="card" />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('img render', () => {
    customRender(<Card data={data} className="card" />);

    expect(screen.getByRole('img')).toBeDefined();
  });

  it('name render', () => {
    customRender(<Card data={data} className="card" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeDefined();
  });

  it('some fields render', () => {
    customRender(<Card data={data} className="card" />);

    expect(screen.getByText('Date of birth:')).toBeDefined();
    expect(screen.getByText('Eye colour:')).toBeDefined();
    expect(screen.getByText('Wands:')).toBeDefined();
  });
});
