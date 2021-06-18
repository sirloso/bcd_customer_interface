import { Action } from '@reduxjs/toolkit'
import { call, put, takeLatest } from 'redux-saga/effects'
import { addUser, getUser, getUserFailure } from '../redux/userSlice'
import * as api from '../api/userApi'
import { UserRequest } from '../utils/types';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchUser(action: Action):any {
   if (!getUser.match(action)) {
      yield put(getUserFailure("action is not get user"));
   }
   try {
      // TODO: figure out how to make this safe
      //@ts-ignore
      let ur = action.payload as UserRequest
      const user = yield call(api.getUser,ur.CustomerID,ur.OrderID)
      yield put(addUser(user));
   } catch (e) {
      console.log(e)
      yield put(getUserFailure("failed getting user"));
   }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* rootSaga() {
   yield takeLatest(getUser.type, fetchUser);
}

export default rootSaga;