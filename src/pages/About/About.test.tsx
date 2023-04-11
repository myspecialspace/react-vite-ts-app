import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('Renders!', () => {
    const component = render(<About />);
    expect(component.container).not.toBeEmptyDOMElement();
  });
});
