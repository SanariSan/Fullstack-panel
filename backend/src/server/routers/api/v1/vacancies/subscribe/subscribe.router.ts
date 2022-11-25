import { Router } from 'express';
import { subscribeCTR } from '../../../../../controllers';
import { asyncHandleMW, syncHandleMW } from '../../../../../middleware';

const subscribeR = Router();

subscribeR.post(
  '/subscribe',
  // asyncHandleMW(
  //   validateBySchemaAsyncMW(SCHEME_AUTHENTICATION.credentials, EVALIDATION_TARGET.BODY),
  // ),
  // asyncHandleMW(stickReposMW),
  syncHandleMW(subscribeCTR),
);

export { subscribeR };
