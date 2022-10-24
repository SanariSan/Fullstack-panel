import { Router } from 'express';
import { accessRegisterCTR } from '../../../../controllers';
import { accessAuthStatusCTR } from '../../../../controllers/access/auth-status';
import {
  asyncHandleMW,
  EVALIDATION_TARGET,
  syncHandleMW,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const registerR = Router();

registerR.get('/register', syncHandleMW(accessAuthStatusCTR));
registerR.post(
  '/register',
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  ),
  asyncHandleMW(accessRegisterCTR),
);

export { registerR };
