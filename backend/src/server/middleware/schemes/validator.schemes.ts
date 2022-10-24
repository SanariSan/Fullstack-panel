import type { NextFunction, Response } from 'express';
import type Joi from 'joi';
import type { ValidationError } from 'joi';
import { validateBySchemaAsync } from '../../../modules/access-layer/schemes';
import { ExpressError } from '../../error';
import type { TRequest } from '../../express.type';
import { EVALIDATION_TARGET } from './schemes.type';

export function validateBySchemaAsyncMW(
  schema: Joi.ObjectSchema,
  target: EVALIDATION_TARGET = EVALIDATION_TARGET.BODY,
) {
  return async (req: TRequest, res: Response, next: NextFunction) =>
    validateBySchemaAsync(schema, req[target])
      .then(() => {
        next();
        return;
      })
      .catch((error: ValidationError) => {
        const messages = JSON.stringify(error.details.map((el) => el.message));
        next(new ExpressError(messages));
      });
}
