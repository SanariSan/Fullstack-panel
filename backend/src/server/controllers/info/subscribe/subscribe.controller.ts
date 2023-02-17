import type { NextFunction, Response } from 'express';
import type { TRequestNarrowed } from '../../../express.type';

export const subscribeCTR = (req: TRequestNarrowed, res: Response, next: NextFunction) => {
  // push parsing params into db for later processing
  // background loop will take it as soon as possible

  console.log('added parsing query to db');

  // res.json({ success: true });
  return;
};
