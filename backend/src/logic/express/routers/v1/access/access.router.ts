import { Router } from 'express';
import { changePasswordR } from './change-password';
import { loginR } from './login';
import { logoutR } from './logout';
import { registerR } from './register';
import { tokenRefreshR } from './token-refresh';

const accessR = Router();

accessR.use(registerR, loginR, logoutR, changePasswordR, tokenRefreshR);

export { accessR };
