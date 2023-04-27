import { useDispatch } from 'react-redux';
import { createStore } from './store';

type Store = ReturnType<typeof createStore>;
export type AppState = ReturnType<Store['getState']>;

export type AppDispatch = Store[`dispatch`];
export const useAppDispatch: () => AppDispatch = useDispatch;
