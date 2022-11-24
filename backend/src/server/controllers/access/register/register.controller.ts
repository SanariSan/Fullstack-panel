import { hash } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { DB } from '../../../../modules/access-layer/db';
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
  // console.log(req.session.id);
  // console.dir(req.session, { depth: 5 });

  const { email, username, password } = req.body;

  const possibleUserId = await DB.any<Record<'id', number>>(
    'SELECT s.id FROM SystemUser AS s WHERE s.email = $1 AND s.username = $2',
    [email, username],
  );

  if (possibleUserId.length > 0) {
    // publishLog(ELOG_LEVEL.DEBUG, `User already exists: ${email} ${username}`);
    throw new DuplicateUserError({
      message: 'User already exists',
      miscellaneous: {
        isAuthenticated: false,
      },
    });
  }

  let createdUser: { id: number; email: string; username: string };
  try {
    const hashedPassword = await hash(password, 12);
    const queryResult = await DB.any<{ id: number; email: string; username: string }>(
      'INSERT INTO SystemUser(email, username, passwordHash) VALUES($1, $2, $3) RETURNING id, email, username',
      [email, username, hashedPassword],
    );
    [createdUser] = queryResult;
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
