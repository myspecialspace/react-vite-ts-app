import { describe, it } from 'vitest';
import Form from './Form';
import { customRender } from '../../test/utils';

describe('Form', () => {
  it('Renders!', () => {
    const component = customRender(<Form />);
    expect(component.container).not.toBeEmptyDOMElement();
  });
});
