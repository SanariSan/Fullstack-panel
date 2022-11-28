import type { NextFunction, Response } from 'express';
import type { ObjectSchema } from 'joi';
import { isError } from 'joi';
import { validateBySchemaAsync } from '../../../modules/access-layer/schemes';
import { GenericExpressError, InternalError } from '../../error';
import type { TRequest } from '../../express.type';
import { EVALIDATION_TARGET } from './schemes.type';

export function validateBySchemaAsyncMW(
  schema: ObjectSchema,
  target: EVALIDATION_TARGET = EVALIDATION_TARGET.BODY,
) {
  return async function validateBySchemaAsyncCTR(req: TRequest, res: Response, next: NextFunction) {
    try {
      await validateBySchemaAsync(schema, req[target]);
      next();
    } catch (error: unknown) {
      if (!isError(error)) {
        next(new InternalError({ message: 'Error during validation' }));
        return;
      }

      const invalidParams = error.details.map((el) => ({
        name: el.context?.key ?? el.context?.label ?? el.path[0],
        reason: el.message.replace(/"/g, ''),
      }));

      next(
        new GenericExpressError({
          message: 'Fields validation error',
          miscellaneous: {
            invalidParams,
          },
        }),
      );
    }
  };
}
