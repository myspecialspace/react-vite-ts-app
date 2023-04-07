import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import Form from './Form';
import { customRender } from '../../test/utils';

describe('Form', () => {
  it('Renders!', () => {
    const component = render(<Form />);
    expect(component.container).not.toBeEmptyDOMElement();
  });
});
