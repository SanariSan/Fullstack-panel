import { useFormikContext } from 'formik';
import type { FC } from 'react';
import { useEffect } from 'react';

const FormSubmitControlContainer: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const formikContext = useFormikContext();
  const { resetForm, setSubmitting } = formikContext;

  useEffect(() => {
    if (isLoading) {
      resetForm();
      setSubmitting(false);
    }
  }, [isLoading, resetForm, setSubmitting]);

  return <></>;
};

export { FormSubmitControlContainer };
