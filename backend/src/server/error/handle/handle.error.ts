import type { Response } from 'express';
import type { IError } from '../../../modules/core/error';
import {
  InternalErrorResponse,
  LoginErrorResponse,
  RegistrationErrorResponse,
} from '../../responses';
import { CredentialsMismatchError, UserNotExistsError } from '../express';
import { DuplicateUserError } from '../express/duplicate-user.error';

function getMatchingResponse(e: Readonly<IError>, res: Response) {
  switch (true) {
    case e instanceof DuplicateUserError: {
      return new RegistrationErrorResponse({ res, data: e.miscellaneous });
    }
    case e instanceof UserNotExistsError:
    case e instanceof CredentialsMismatchError: {
      return new LoginErrorResponse({ res, data: e.miscellaneous });
    }
    default: {
      return new InternalErrorResponse({ res, data: e.miscellaneous });
    }
  }
}

const handleExpress = (e: Readonly<IError>, res: Response) => getMatchingResponse(e, res).send();

export { handleExpress };
