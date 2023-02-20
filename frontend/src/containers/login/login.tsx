import type { FormikHelpers } from 'formik';
import { Formik } from 'formik';
import type { FC } from 'react';
// import { useCallback, useState, useEffect, useMemo } from 'react';
// import { debounceLeadingWrap, debounceWrap } from '../../helpers/util';
import { useCallback } from 'react';
import { LoginComponent } from '../../components/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LoginOutgoingDM } from '../../services/api';
import { loginUserAsync, themeSelector, userAuthLoadingStatusSelector } from '../../store';
import { FormSubmitControlContainer } from '../form-submit-control';
import { INITIAL_VALUES, VALIDATION_SCHEMA } from './login.const';
import type { TLoginFormValues } from './login.type';

const LoginContainer: FC = () => {
  const theme = useAppSelector(themeSelector);
  const userAuthLoadingState = useAppSelector(userAuthLoadingStatusSelector);
  // const userAuthError = useAppSelector(userAuthErrorSelector);
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: TLoginFormValues, actions: FormikHelpers<TLoginFormValues>) => {
      console.log({ values });
      void dispatch(
        loginUserAsync(
          new LoginOutgoingDM({ username: values.username, password: values.password }),
        ),
      );
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
            {...formikConfig}
          />
          {/* <>{showErrors ? userAuthError : undefined}</> */}
          <FormSubmitControlContainer isLoading={userAuthLoadingState === 'loading'} />
        </>
      )}
    </Formik>
  );
};

export { LoginContainer };
