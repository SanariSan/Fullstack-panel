import { Router } from 'express';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const changePasswordR = Router();

changePasswordR.post(
  '/change-password',
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenAccess, EVALIDATION_TARGET.HEADER),
  ),
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentialsChange, EVALIDATION_TARGET.BODY),
  ),
  asyncHandleMW(authentificateMW),
  // asyncHandleMW(StickRepos),
  // asyncHandleMW<
  //   TRequestValidatedTokenAccess & TRequestValidatedCredentialsChange & TRequestTokenPayload
  // >(accessChangePasswordMW),
);

export { changePasswordR };
