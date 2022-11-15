import { object, string } from 'yup';
import type { TFormValues } from './login.type';

const VALIDATION_SCHEMA = object({
  username: string()
    .required('Username required')
    .min(6, 'Username too short')
    .max(28, 'Username too long!'),
  password: string()
    .required('Password required')
    .min(6, 'Password too short')
    .max(28, 'Password too long!'),
});

const INITIAL_VALUES: TFormValues = { username: '0a8046d4d', password: 'pwd123456' };

export { VALIDATION_SCHEMA, INITIAL_VALUES };
