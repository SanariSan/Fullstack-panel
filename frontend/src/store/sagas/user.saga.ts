import { takeEvery, call, put, apply } from 'redux-saga/effects';
import { request } from '../../services';
import { getUserAsync, setSuccess } from '../slices';
// import type { Action } from '@reduxjs/toolkit';

async function getUserLoginStatus() {
  //   try {
  // const abortController = new AbortController();
  //   const response = await
  return request({
    url: `http://127.0.0.1:3000/v1/access/login`,
    //   abortSignal: abortController.signal,
  });
  //   } catch (error: unknown) {
  //     console.log(`Req error in thunk _ ${String(error)}`);
  //     // console.log(error);
  //     throw error;
  //   }
}

function* getUserLoginStatusWorker(action: { type: string; payload: unknown }) {
  console.log(`getUserLoginStatusWorker | ${JSON.stringify(action)}`);

  try {
    const response = (yield call(getUserLoginStatus)) as Response;

    /* eslint-disable @typescript-eslint/unbound-method */
    const json = (yield call([response, response.json])) as {
      isAuthenticated: boolean;
      login?: string;
    };
    // const json = (yield call(
    //   () =>
    //     new Promise((resolve): void => {
    //       resolve(response.json());
    //     }),
    // )) as {
    //   isAuthenticated: boolean;
    //   login?: string;
    // };
    yield put(setSuccess(json));
  } catch (error) {
    console.log(`Req error in getUserLoginStatusWorker`);
    console.log(error);
    // yield put(setUserError(payload));
  }
}

function* userWatcher() {
  yield takeEvery(getUserAsync, getUserLoginStatusWorker);
}

export { userWatcher };
