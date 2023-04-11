const SEARCH_KEY = 'search';

export const getSearchItem = (): string => localStorage.getItem(SEARCH_KEY) || '';
export const setSearchItem = (value: string): void => localStorage.setItem(SEARCH_KEY, value);
