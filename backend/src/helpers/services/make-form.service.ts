import FormData from 'form-data';

const makeForm = <T>({ obj }: { readonly obj: T }) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    acc.append(String(key), val);
    return acc;
  }, new FormData());

export { makeForm };
