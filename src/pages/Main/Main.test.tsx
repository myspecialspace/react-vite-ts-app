import { act } from 'react-dom/test-utils';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import characters from '../../mocks/characters';

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
    const component = render(<Main />);

    expect(component.container).not.toBeEmptyDOMElement();
  });

  it('List render', async () => {
    await act(() => {
      render(<Main />);
    });

    expect(screen.getByRole('list')).toBeDefined();
  });
});
