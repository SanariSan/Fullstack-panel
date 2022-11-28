import { hash } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { UserRepository } from '../../../../db';
import { DuplicateUserError } from '../../../error';
import type { TRequestValidatedRegister } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

// dbGetNoUserOrThrow(email, username)
// dbCreateUserOrThrow(email, username, hashedPassword)
// sessionInit(req.session, data)

export const accessRegisterCTR = async (
  req: TRequestValidatedRegister,
  res: Response,
  next: NextFunction,
) => {
  const { email, username, password } = req.body;

  try {
    await UserRepository.findNoneByEmailAndUsername({ email, username });
  } catch {
    throw new DuplicateUserError({
      message: 'User already exists',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  let createdUser: Awaited<ReturnType<typeof UserRepository.insert>>;
  try {
    const hashedPassword = await hash(password, 12);
    createdUser = await UserRepository.insert({ email, username, hashedPassword });
  } catch {
    throw new DuplicateUserError({
      message: 'User already exists, might be race condition',
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
    userId: createdUser.id,
    email: createdUser.email,
    username: createdUser.username,
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
