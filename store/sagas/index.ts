import { all } from 'redux-saga/effects';
import { watchFetchData } from './dataSaga';

export function* rootSaga() {
  yield all([watchFetchData()]);
}
