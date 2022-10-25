import type { TLocalStorageKey } from './local-storage.helper.type';

const getLSValue = (key: TLocalStorageKey): unknown | undefined => {
  const item = window.localStorage.getItem(key);
  let parsed: unknown;

  try {
    parsed = item !== null ? JSON.parse(item) : undefined;
  } catch {
    console.warn('No key in local storage, please clear cookies and refresh');
  }

  return parsed;
};

const setLSValue = (key: TLocalStorageKey, value: unknown): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const delLSValue = (key: TLocalStorageKey): void => {
  window.localStorage.removeItem(key);
};

export { getLSValue, setLSValue, delLSValue };
