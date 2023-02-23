import { Router } from 'express';
import { authStatusR } from './auth-status';
import { changePasswordR } from './change-password';
import { loginR } from './login';
import { logoutR } from './logout';
import { registerR } from './register';

const accessR = Router();

accessR.use(authStatusR, registerR, loginR, logoutR, changePasswordR);

export { accessR };
