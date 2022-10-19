import type { NextFunction, Response } from 'express';
import { jwtDecode } from '../../../modules/access-layer/jwt';

import type { TRequestTokenPayload, TRequestValidatedTokenAccess } from '../../express.type';

export async function authentificateMW(
  req: TRequestValidatedTokenAccess,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const reqMutable = req as TRequestValidatedTokenAccess & TRequestTokenPayload;

  const token = req.headers.authorization.split(' ')[1];
  const accessTokenPayload = await jwtDecode(token);

  // TODO: change TObjectUnknown to typed object, when token prm format is stable
  reqMutable.accessTokenPayloadPrm = JSON.parse(accessTokenPayload.prm) as Record<string, unknown>;

  next();
}
