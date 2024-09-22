import { all } from 'redux-saga/effects';
import { watchFetchData, watchCrudOperations } from './dataSaga';

export function* rootSaga() {
  yield all([watchFetchData(), watchCrudOperations()]);
}
