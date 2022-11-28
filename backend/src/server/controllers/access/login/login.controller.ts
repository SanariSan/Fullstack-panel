import { compare } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { UserRepository } from '../../../../db';
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
  const { username, password } = req.body;

  let possibleUser: Awaited<ReturnType<typeof UserRepository.findByUsername>>;
  try {
    possibleUser = await UserRepository.findByUsername({ username }); // email: '604f47397@gmail.com'
  } catch {
    throw new UserNotExistsError({
      message: 'User does not exist',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  try {
    await compare(password, possibleUser.passwordhash);
  } catch {
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
