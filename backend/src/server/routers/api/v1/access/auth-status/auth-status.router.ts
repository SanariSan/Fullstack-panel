import { Router } from 'express';
import { accessAuthStatusCTR } from '../../../../../controllers/access/auth-status';
import { syncHandleMW } from '../../../../../middleware';

const authStatusR = Router();

authStatusR.get('/auth-status', syncHandleMW(accessAuthStatusCTR));

export { authStatusR };
