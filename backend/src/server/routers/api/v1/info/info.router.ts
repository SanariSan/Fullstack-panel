import { Router } from 'express';
import { subscribeR } from './subscribe';

const infoR = Router();

infoR.use(subscribeR);

export { infoR };
