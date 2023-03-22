import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main', () => {
  it('Renders!', () => {
    const component = render(<Main />);
    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('List render', () => {
    render(<Main />);

    expect(screen.getByRole('list')).toBeDefined();
  });
});
