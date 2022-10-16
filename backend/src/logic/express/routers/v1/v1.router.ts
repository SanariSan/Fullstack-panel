import { Router } from 'express';
import { accessR } from './access';
import { vacanciesR } from './vacancies';

const v1 = Router();

v1.use('/access', accessR);
v1.use('/vacancies', vacanciesR);

export { v1 };
