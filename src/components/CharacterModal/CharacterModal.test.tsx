import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import ModalCharacter from './CharacterModal';
import characters from '../../mocks/characters';

describe('ModalCharacter', () => {
  const character = characters.data[0];

  it('Renders!', () => {
    const component = render(<ModalCharacter character={character} />);

    expect(component.container).not.toBeEmptyDOMElement();
  });
});
