import { Router } from 'express';
import { accessLogoutCTR } from '../../../../controllers';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  syncHandleMW,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const logoutR = Router();

logoutR.delete(
  '/logout',
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenAccess, EVALIDATION_TARGET.HEADER),
  ),
  syncHandleMW(authentificateMW),
  asyncHandleMW(accessLogoutCTR),
);

export { logoutR };
