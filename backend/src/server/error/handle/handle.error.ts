import type { Response } from 'express';
import type { IError } from '../../../error';
import {
  ForbiddenErrorResponse,
  InternalErrorResponse,
  LoginErrorResponse,
  NotFoundErrorResponse,
  RegistrationErrorResponse,
} from '../../responses';
import {
  CredentialsMismatchError,
  GenericExpressError,
  NoSessionError,
  NotFoundError,
  UserNotExistsError,
} from '../express';
import { DuplicateUserError } from '../express/duplicate-user.error';

function getMatchingErrorResponse(e: Readonly<IError>) {
  switch (true) {
    case e instanceof DuplicateUserError: {
      return RegistrationErrorResponse;
    }
    case e instanceof UserNotExistsError:
    case e instanceof CredentialsMismatchError: {
      return LoginErrorResponse;
    }
    case e instanceof NotFoundError: {
      return NotFoundErrorResponse;
    }
    case e instanceof NoSessionError: {
      return ForbiddenErrorResponse;
    }
    // todo: decide what to do with this
    case e instanceof GenericExpressError: {
      return InternalErrorResponse;
    }
    default: {
      return InternalErrorResponse;
    }
  }
}

const handleExpress = (e: Readonly<IError>, res: Response) => {
  const { miscellaneous } = e;

  // new (getMatchingErrorResponse(e))({ res, miscellaneous }).send();
  const ErrorResponse = getMatchingErrorResponse(e);
  const errorResponse = new ErrorResponse({ res, miscellaneous });
  errorResponse.send();
};

export { handleExpress };
