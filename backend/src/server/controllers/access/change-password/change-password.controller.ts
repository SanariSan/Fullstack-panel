import { compare, hash } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { UserRepository } from '../../../../db';
import { SessionManager } from '../../../../helpers/session';
import { CredentialsMismatchError, InternalError } from '../../../error';
import type { TRequestValidatedChangePassword } from '../../../express.type';
import { SuccessResponse } from '../../../responses';

export const changePasswordCTR = async (
  req: TRequestValidatedChangePassword,
  res: Response,
  next: NextFunction,
) => {
  const { username } = req.session.user;
  const { oldPassword, newPassword } = req.body;

  let possibleUser: Awaited<ReturnType<typeof UserRepository.findByUsername>>;
  try {
    possibleUser = await UserRepository.findByUsername({ username }); // email: '604f47397@gmail.com'
  } catch {
    throw new InternalError({
      message: 'User have session, but not found in database, wtf?',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  if (!(await compare(oldPassword, possibleUser.passwordhash))) {
    throw new CredentialsMismatchError({
      message: 'Old password is wrong',
      miscellaneous: {
        isAuthenticated: true,
      },
    });
  }

  try {
    const hashedPassword = await hash(newPassword, 12);
    await UserRepository.updatePassword({ username, hashedPassword });
  } catch {
    throw new InternalError({
      message: 'Could not hash password or update it in database',
      miscellaneous: {
        isAuthenticated: true,
      },
    });
  }

  await SessionManager.destroy({ session: req.session });

  new SuccessResponse({
    res,
    data: {
      username,
      isAuthenticated: false,
    },
  }).send();
};
