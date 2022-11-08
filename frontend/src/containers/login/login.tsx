import { useCallback, useEffect } from 'react';
import type { FC } from 'react';
import type { FormikHelpers } from 'formik';
import { LoginComponent } from '../../components/login';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkUserSessionStatusAsync, themeSelector } from '../../store';

const LoginContainer: FC = () => {
  const theme = useAppSelector(themeSelector);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   void dispatch(getUserLoginStatusAsync());
  // });

  const onFormSubmit = useCallback(
    // (
    //   values: {
    //     username: string;
    //     password: string;
    //   },
    //   actions: FormikHelpers<{
    //     username: string;
    //     password: string;
    //   }>,
    // ) => {
    (e: any) => {
      e.preventDefault();
      console.log('ok');
      console.log(e);
      // void dispatch(checkUserSessionStatusAsync());
      // actions.resetForm();
      // void dispatch(getUserLoginStatusAsync());
      // req => set user status
      // all that do in thunk

      //   void request({
      //     url: 'http://localhost:301/access/login',
      //     method: 'POST',
      //     fetchOtions: {
      //       credentials: 'include',
      //     },
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(values),
      //   })
      //     .catch((_error) => {
      //       console.log(_error);
      //       return;
      //     })
      //     .then((res) => {
      //       if (!res || !res.ok || res.status >= 400) {
      //         return;
      //       }
      //       return res.json();
      //     })
      //     .then((data) => {
      //       if (data === undefined) return;
      //       return true;
      // setUser({ ...data });
      // if (data?.status) {
      //   setError(data.status);
      // } else if (data.loggedIn) {
      //   navigate('/home');
      // }
      // }
      // );
    },
    [],
  );

  return <LoginComponent theme={theme} onSubmit={onFormSubmit} />;
};

export { LoginContainer };
