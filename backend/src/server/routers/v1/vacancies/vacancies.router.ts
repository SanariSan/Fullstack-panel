import { Router } from 'express';
import { subscribeR } from './subscribe';

const vacanciesR = Router();

vacanciesR.use(subscribeR);

export { vacanciesR };
