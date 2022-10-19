import { Router } from 'express';
import {
  asyncHandleMW,
  authentificateMW,
  EVALIDATION_TARGET,
  validateBySchemaAsyncMW,
} from '../../../../middleware';
import { SCHEME_AUTHENTICATION } from '../../../../schemes';

const tokenRefreshR = Router();

tokenRefreshR.put(
  '/token-refresh',
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenAccess, EVALIDATION_TARGET.HEADER),
  ),
  asyncHandleMW(
    validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.tokenRefresh, EVALIDATION_TARGET.BODY),
  ),
  asyncHandleMW(authentificateMW),
  // asyncHandleMW(StickRepos),
  // asyncHandleMW<
  //   TRequestValidatedTokenAccess & TRequestValidatedTokenRefresh & TRequestTokenPayload
  // >(accessTokenRefreshMW),
);

export { tokenRefreshR };
