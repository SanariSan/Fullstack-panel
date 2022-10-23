import { compare } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { ELOG_LEVEL } from '../../../general.type';
import { DB } from '../../../modules/access-layer/db';
import { publishLog } from '../../../modules/access-layer/events/pubsub';
import type { TRequestValidatedCredentials } from '../../express.type';

export const accessLoginCTR = async (
  req: TRequestValidatedCredentials,
  res: Response,
  next: NextFunction,
) => {
  // console.log(req.session.id);
  // console.dir(req.session, { depth: 5 });

  if (req.session.user && req.session.user.isAuthenticated === true) {
    publishLog(ELOG_LEVEL.WARN, 'User already authenticated');
    res.setHeader('Location', '/');
    res.json({
      login: req.session.user.login,
      isAuthenticated: true,
    });
    return;
  }

  const { login, password } = req.body;

  const possibleUser = await DB.any<
    { id: number; login: string; password_hash: string } | undefined
  >('SELECT s.id, s.login, s.password_hash FROM System_User AS s WHERE s.Login = $1', [login]).then(
    (result) => result[0],
  );

  if (possibleUser === undefined) {
    publishLog(ELOG_LEVEL.WARN, 'User does not exist');
    res.status(400).send('User does not exist');
    return;
  }

  const compareResult = await compare(password, possibleUser.password_hash);

  if (!compareResult) {
    publishLog(ELOG_LEVEL.WARN, 'Wrong password');
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

// import { jwtEncode } from '../../../modules/access-layer/jwt';
// const accessToken = await jwtEncode({});
// const refreshToken = await jwtEncode({});
// res.json({ accessToken, refreshToken });

// return new SuccessResponse("Login Success", {
// 	user: userData,
// 	tokens: tokens,
// }).send(res);
