import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import CardList from './CardList';
import characters from '../../mocks/characters';
import { customRender } from '../../test/utils';

describe('CardList', () => {
  it('Renders!', () => {
    const component = customRender(<CardList characters={[]} onClick={() => {}} />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('Renders 5 list item!', () => {
    customRender(<CardList characters={characters.data.slice(0, 5)} onClick={() => {}} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
