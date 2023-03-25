import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Character from './Character';
// import characters from '../../helpers/data/potter.json';

describe('Character', () => {
  // const data = characters[0];

  it('Renders!', () => {
    const component = render(<Character className="character" />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  // it('name render', () => {
  //   render(<Character className="character" />);

  //   expect(screen.getByRole('heading', { level: 2 })).toBeDefined();
  // });

  it('some fields render', () => {
    render(<Character className="character" />);
    expect(screen.getByText('Wizard')).toBeDefined();
  });
});
