import { Router } from 'express';
import { accessLoginCTR } from '../../../../controllers';
import { accessAuthStatusCTR } from '../../../../controllers/access/auth-status';
import {
  asyncHandleMW,
  EVALIDATION_TARGET,
  syncHandleMW,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const loginR = Router();

loginR.get('/login', syncHandleMW(accessAuthStatusCTR));
loginR.post(
  '/login',
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  asyncHandleMW(accessLoginCTR),
);

export { loginR };
