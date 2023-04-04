import { act } from 'react-dom/test-utils';
import { describe, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Main from './Main';
import characters from '../../mocks/characters';
import { customRender } from '../../test/utils';

beforeAll(() => {
  vi.spyOn(window, 'fetch').mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => characters,
  } as Response);
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('Main', () => {
  it('Renders!', () => {
    const component = customRender(<Main />);

    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('List render', async () => {
    await act(() => {
      customRender(<Main />);
    });

    expect(screen.getByRole('list')).toBeDefined();
  });
});
