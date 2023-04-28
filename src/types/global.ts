import { AppState } from 'src/store/index';

declare global {
  interface Window {
    __INITIAL_STATE__: AppState;
  }
}

export {};
