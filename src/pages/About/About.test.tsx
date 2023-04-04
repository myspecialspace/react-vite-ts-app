import { describe, it } from 'vitest';
import About from './About';
import { customRender } from '../../test/utils';

describe('About', () => {
  it('Renders!', () => {
    const component = customRender(<About />);
    expect(component.container).not.toBeEmptyDOMElement();
  });
});
