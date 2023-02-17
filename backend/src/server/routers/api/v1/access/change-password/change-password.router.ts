import { Router } from 'express';
import { changePasswordCTR } from '../../../../../controllers';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  syncHandleMW,
  validateBySchemaAsyncMW,
} from '../../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../../schemes';

const changePasswordR = Router();

changePasswordR.put(
  '/change-password',
  syncHandleMW(authentificateMW),
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.changePassword, EVALIDATION_TARGET.BODY),
  ),
  asyncHandleMW(changePasswordCTR),
);

export { changePasswordR };
