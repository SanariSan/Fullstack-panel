import { hash } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../../../general.type';
import { DB } from '../../../../modules/access-layer/db';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import type { TRequestValidatedCredentials } from '../../../express.type';

export const accessRegisterCTR = async (
  req: TRequestValidatedCredentials,
  res: Response,
  next: NextFunction,
) => {
  // console.log(req.session.id);
  // console.dir(req.session, { depth: 5 });
  const { login, password } = req.body;

  const possibleUserId = await DB.any<Record<'id', number>>(
    'SELECT s.id FROM SystemUser AS s WHERE s.Login = $1',
    [login],
  );

  if (possibleUserId.length > 0) {
    publishLog(ELOG_LEVEL.DEBUG, `User exists: ${login}`);
    res.status(400).send('User exists');
    return;
  }

  const hashedPassword = await hash(password, 12);
  const createdUser = await DB.any<{ id: number; login: string }>(
    'INSERT INTO SystemUser(login, passwordHash) VALUES($1, $2) RETURNING id, login',
    [login, hashedPassword],
  )
    .then((result) => result[0])
    .catch(() => {
      throw new Error(
        'User was not registered, but appeared in INSERT stage, might be race attack',
      );
    });

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
    login: createdUser.login,
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

  res.json({
    login: createdUser.login,
    isAuthenticated: true,
  });
  return;
};
