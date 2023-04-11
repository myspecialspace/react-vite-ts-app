import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import CharacterModal from './CharacterModal';
import characters from '../../mocks/characters';

describe('ModalCharacter', () => {
  const character = characters.data[0];

  it('Renders!', () => {
    const component = render(<CharacterModal character={character} />);

    expect(component.container).not.toBeEmptyDOMElement();
  });
});
