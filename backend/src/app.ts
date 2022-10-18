/* eslint-disable @typescript-eslint/no-unused-vars */

import { stringify } from 'node:querystring';
import { publishLog } from './access-layer/events/pubsub';
import { DB } from './core/db';
import { Request } from './core/services';
import { ELOG_LEVEL } from './general.type';
import { parseResponse } from './helpers/services';
import { setupCli, setupDb, setupErrorHandle, setupExpress, setupValidateEnv } from './setup';

async function getVak() {
  const response = await Request.get({
    host: 'https://spb.hh.ru',
    path: '/vacancy/71139429?from=vacancy_search_list&amp;hhtmFrom=vacancy_search_list&amp;query=middle%20python%20developer',
  }).catch((error: Readonly<unknown>) => {
    console.dir(error);
  });

  return parseResponse({ response });
}
async function getSearch() {
  const response = await Request.get({
    host: 'https://spb.hh.ru',
    path: '/search/vacancy?text=middle+python+developer',
  }).catch((error: Readonly<unknown>) => {
    console.dir(error);
  });

  return parseResponse({ response });
}
async function apiSearch() {
  const response = await Request.get({
    // host: 'https://json.myip.wtf',
    // path: '/',
    host: 'https://api.hh.ru',
    path: `/vacancies?${stringify({
      text: 'intern python developer',
      experience: 'noExperience',
    })}`,
  }).catch((error: Readonly<unknown>) => {
    console.dir(error);
  });

  return parseResponse({ response });
}
async function apiVacansy() {
  const response = await Request.get({
    host: 'https://api.hh.ru',
    path: `/vacancies/71164587`,
  }).catch((error: Readonly<unknown>) => {
    console.dir(error);
  });

  return parseResponse({ response });
}

async function test() {
  const resp = await DB.one<string>('SELECT * FROM Proxy WHERE Ip LIKE $1', ['192.%']);
  publishLog(ELOG_LEVEL.WARN, resp);

  // const r = await apiVacansy();
  // writeFileSync(
  //   `./vacText${randomInt(240)}.js`,
  //   `const r = ${JSON.stringify(r.response.data, undefined, 2)};`,
  // );
  // console.dir(r.response, { depth: 10 });
}

/* eslint-disable @typescript-eslint/require-await */
async function init() {
  setupValidateEnv();
  setupErrorHandle();
  setupCli();
  await setupDb();
  setupExpress();

  await test();
  // setupDashboard();
}

void init();
