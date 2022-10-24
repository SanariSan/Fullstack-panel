import { compare } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../../../general.type';
import { DB } from '../../../../modules/access-layer/db';
import { publishLog } from '../../../../modules/access-layer/events/pubsub';
import type { TRequestValidatedCredentials } from '../../../express.type';

export const accessLoginCTR = async (
  req: TRequestValidatedCredentials,
  res: Response,
  next: NextFunction,
) => {
  // console.log(req.session.id);
  // console.dir(req.session, { depth: 5 });

  const { login, password } = req.body;

  type TPossibleUser = { id: number; login: string; passwordhash: string } | undefined;
  const possibleUser = await DB.any<TPossibleUser>(
    'SELECT s.id, s.login, s.passwordHash FROM SystemUser AS s WHERE s.login = $1',
    [login],
  ).then((result) => result[0]);

  if (possibleUser === undefined) {
    publishLog(ELOG_LEVEL.DEBUG, `User does not exist: ${login}`);
    res.status(400).send('User does not exist');
    return;
  }

  const compareResult = await compare(password, possibleUser.passwordhash);

  if (!compareResult) {
    publishLog(ELOG_LEVEL.DEBUG, `Wrong password: ${login}`);
    res.status(400).send('Wrong password');
    return;
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
    login: possibleUser.login,
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
    login: req.session.user.login,
    isAuthenticated: true,
  });
  return;
};
