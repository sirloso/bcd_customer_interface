import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/rootSaga';
import DevTools from '../utils/DevTools'

let sagaMiddleWare = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    user: userReducer
  },
  middleware: m =>
    getDefaultMiddleware()
      .concat(
        sagaMiddleWare,
      )
  ,
  devTools: true,
  enhancers: [
    DevTools.instrument()
  ]
});

sagaMiddleWare.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
