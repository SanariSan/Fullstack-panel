import { compare } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { DB } from '../../../../modules/access-layer/db';
import { CredentialsMismatchError, UserNotExistsError } from '../../../error';
import type { TRequestValidatedLogin } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

// dbGetUserOrThrow(username)
// matchPasswordOrThrow
// sessionInit(req.session, data)

export const accessLoginCTR = async (
  req: TRequestValidatedLogin,
  res: Response,
  next: NextFunction,
) => {
  // console.log(req.session.id);
  // console.dir(req.session, { depth: 5 });

  const { username, password } = req.body;

  type TPossibleUser =
    | { id: number; email: string; username: string; passwordhash: string }
    | undefined;
  const possibleUser = await DB.any<TPossibleUser>(
    'SELECT s.id, s.email, s.username, s.passwordHash FROM SystemUser AS s WHERE s.username = $1',
    [username],
  ).then((result) => result[0]);

  if (possibleUser === undefined) {
    // publishLog(ELOG_LEVEL.DEBUG, `User does not exist: ${username}`);
    throw new UserNotExistsError({
      message: 'User does not exist',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  const compareResult = await compare(password, possibleUser.passwordhash);

  if (!compareResult) {
    // publishLog(ELOG_LEVEL.DEBUG, `Wrong password: ${username}`);
    throw new CredentialsMismatchError({
      message: 'Wrong password',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  await new Promise<void>((resolve, reject) => {
    req.session.regenerate((err) => {
      if (err !== undefined) {
        reject();
      }
      resolve();
    });
  });

  req.session.user = {
    userId: possibleUser.id,
    email: possibleUser.email,
    username: possibleUser.username,
    isAuthenticated: true,
  };

  await new Promise<void>((resolve, reject) => {
    req.session.save((err) => {
      if (err !== undefined) {
        reject();
      }
      resolve();
    });
  });

  new SuccessResponse({
    res,
    data: {
      username: req.session.user.username,
      isAuthenticated: true,
    },
  }).send();
};
