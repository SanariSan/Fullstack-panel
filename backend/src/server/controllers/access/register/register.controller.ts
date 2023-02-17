import { hash } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { UserRepository } from '../../../../db';
import { SessionManager } from '../../../../helpers/session';
import { DuplicateUserError } from '../../../error';
import type { TRequestValidatedRegister } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const accessRegisterCTR = async (
  req: TRequestValidatedRegister,
  res: Response,
  next: NextFunction,
) => {
  const { email, username, password } = req.body;

  try {
    await UserRepository.findNoneByEmailOrUsername({ email, username });
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
      message: 'User already exists',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  await SessionManager.regenerate({ session: req.session });
  req.session.user = {
    userId: createdUser.id,
    email: createdUser.email,
    username: createdUser.username,
    isAuthenticated: true,
  };
  await SessionManager.save({ session: req.session });

  new SuccessResponse({
    res,
    data: {
      username: req.session.user.username,
      isAuthenticated: true,
    },
  }).send();
};
