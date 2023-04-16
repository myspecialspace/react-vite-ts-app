import { describe, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { WrappedApp, App } from './App';
import { customRender } from './test/utils';

describe('App', () => {
  it('Renders!', () => {
    const component = customRender(<WrappedApp />);
    expect(component.container).not.toBeEmptyDOMElement();
  });
  it('Renders not found if invalid path', () => {
    customRender(
      <MemoryRouter initialEntries={['/this-route-does-not-exist']}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('404');
  });
});
