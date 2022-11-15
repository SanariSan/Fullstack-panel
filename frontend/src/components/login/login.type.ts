import type { FormikErrors } from 'formik';

type TLogin = {
  theme: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  errors: FormikErrors<{ username; password }>;
};

export type { TLogin };
