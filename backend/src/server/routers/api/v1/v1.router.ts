import { Router } from 'express';
import { accessR } from './access';
import { infoR } from './info';

const v1 = Router();

v1.use('/access', accessR);
v1.use('/info', infoR);

export { v1 };
