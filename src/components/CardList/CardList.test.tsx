import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import characters from '../../helpers/data/potter.json';

describe('CardList', () => {
  it('Renders!', () => {
    const component = render(<CardList characters={[]} />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('Renders 5 list item!', () => {
    render(<CardList characters={characters.slice(0, 5)} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
