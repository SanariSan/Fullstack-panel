import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
import { useCallback } from 'react';
import { LoginComponent } from '../../components/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginUserAsync, themeSelector, userAuthLoadingStatusSelector } from '../../store';
import { FormSubmitControlContainer } from '../form-submit-control';
import { changeRoute } from '../history-catcher';
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './login.const';
import type { TFormValues } from './login.type';

const LoginContainer: FC = () => {
  const theme = useAppSelector(themeSelector);
  const userAuthLoadingState = useAppSelector(userAuthLoadingStatusSelector);
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: TFormValues, actions: FormikHelpers<TFormValues>) => {
      console.log({ values });
      void dispatch(loginUserAsync({ login: values.username, password: values.password }));
    },
    [dispatch],
  );

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={VALIDATION_SCHEMA} onSubmit={onSubmit}>
      {(formikConfig) => (
        <>
          <LoginComponent
            theme={theme}
            isLoading={userAuthLoadingState === 'loading'}
            onChangeRoute={() => {
              changeRoute('/register');
            }}
            {...formikConfig}
          />
          <FormSubmitControlContainer isLoading={userAuthLoadingState === 'loading'} />
        </>
      )}
    </Formik>
  );
};

export { LoginContainer };
