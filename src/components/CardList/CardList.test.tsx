import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import characters from '../../mocks/characters';

describe('CardList', () => {
  it('Renders!', () => {
    const component = render(<CardList characters={[]} onClick={() => {}} />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('Renders 5 list item!', () => {
    render(<CardList characters={characters.data.slice(0, 5)} onClick={() => {}} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
