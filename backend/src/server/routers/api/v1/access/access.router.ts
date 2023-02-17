import { Router } from 'express';
import { changePasswordR } from './change-password';
import { loginR } from './login';
import { logoutR } from './logout';
import { registerR } from './register';

const accessR = Router();

accessR.use(registerR, loginR, logoutR, changePasswordR);

export { accessR };
