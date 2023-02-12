import type { FormikProps } from 'formik';
import type { TLoginFormValues } from '../../containers/login/login.type';

type TProps = FormikProps<TLoginFormValues>;

type TLogin = {
  [TKey in keyof TProps]: TProps[TKey];
} & {
  theme: string;
  isLoading: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export type { TLogin };
