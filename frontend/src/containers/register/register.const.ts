import { object, string, ref } from 'yup';
import type { TFormValues } from './register.type';

const VALIDATION_SCHEMA = object({
  username: string()
    .required('Username required')
    .min(6, 'Username too short')
    .max(28, 'Username too long'),
  password: string()
    .required('Password required')
    .min(6, 'Password too short')
    .max(28, 'Password too long'),
  passwordRe: string()
    .required('Please retype your password')
    .oneOf([ref('password')], 'Your passwords do not match'),
});

const INITIAL_VALUES: TFormValues = {
  username: '0a8046d4d',
  password: 'pwd123456',
  passwordRe: 'pwd123456',
};

export { VALIDATION_SCHEMA, INITIAL_VALUES };
