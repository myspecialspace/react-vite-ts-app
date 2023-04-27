import { AppState } from '../store';

declare global {
  interface Window {
    __INITIAL_STATE__: AppState;
  }
}
