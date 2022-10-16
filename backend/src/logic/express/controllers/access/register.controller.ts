import { hash } from 'bcryptjs';
import type { NextFunction, Response } from 'express';
import { jwtEncode } from '../../../../access-layer/jwt';
import type { TRequestValidatedCredentials } from '../../express.type';

export const accessRegisterCTR = async (
  req: TRequestValidatedCredentials,
  res: Response,
  next: NextFunction,
) => {
  // TODO:
  // get user record from db by email
  // if exists - throw Error

  const { email, password } = req.body;
  const hashedPassword = await hash(password, 12);
  const accessToken = await jwtEncode({});
  const refreshToken = await jwtEncode({});

  res.json({
    email,
    password,
    hashedPassword,
    accessToken,
    refreshToken,
  });

  // TODO:
  //   return new SuccessResponse('Signup Successful', {
  //     user: userData,
  //     tokens: { accessToken, refreshToken },
  //   }).send(res);
};
