import { call, put, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser() {
   try {
      //       const user = yield call(Api.fetchUser, action.payload.userId);
      //       yield put({type: "USER_FETCH_SUCCEEDED", user: user});
      console.log("Fetchign user")
      yield put({type:"counter/hello"})
   } catch (e) {
      //       yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
const mainAction = 'counter/incrementByAmount'
function* rootSaga() {
   yield takeLatest(mainAction, fetchUser);
}

export default rootSaga;