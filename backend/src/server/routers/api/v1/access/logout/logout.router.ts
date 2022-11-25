import { Router } from 'express';
import { accessLogoutCTR } from '../../../../../controllers';
import { asyncHandleMW, authentificateMW, syncHandleMW } from '../../../../../middleware';

const logoutR = Router();

logoutR.delete('/logout', syncHandleMW(authentificateMW), asyncHandleMW(accessLogoutCTR));

export { logoutR };
