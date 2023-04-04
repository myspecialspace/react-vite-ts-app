import { describe, it } from 'vitest';
import CharacterModal from './CharacterModal';
import characters from '../../mocks/characters';
import { customRender } from '../../test/utils';

describe('CharacterModal', () => {
  const character = characters.data[0];

  it('Renders!', () => {
    const component = customRender(<CharacterModal character={character} />);

    expect(component.container).not.toBeEmptyDOMElement();
  });
});
