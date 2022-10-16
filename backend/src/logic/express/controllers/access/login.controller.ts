import { compare } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { jwtEncode } from '../../../../access-layer/jwt';
import type { TRequestValidatedCredentials } from '../../express.type';

export const accessLoginCTR = async (
  req: TRequestValidatedCredentials,
  res: Response,
  next: NextFunction,
) => {
  // TODO:
  // get user record from db by email
  // if not found - throw Error
  //
  // compare pass with the hash from user record

  const hashedPassword = '$2a$12$AZgCs5ZD8bzsP08LeJSOxuOawfVPvd/jDZ8L5JjeKJnXEbqjr.5wm'; // ABCabc123
  const compareResult = await compare(req.body.password, hashedPassword);

  if (!compareResult) {
    res.status(400).send('Wrong password');
    return;
  }

  // create new tokens, save to db, send to user, along with his data
  const accessToken = await jwtEncode({});
  const refreshToken = await jwtEncode({});

  res.json({ accessToken, refreshToken });
  // return new SuccessResponse("Login Success", {
  // 	user: userData,
  // 	tokens: tokens,
  // }).send(res);
};
