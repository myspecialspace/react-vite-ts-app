import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });
