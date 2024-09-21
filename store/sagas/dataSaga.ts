import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../reducers/dataReducer';

function fetchApi() {
  return fetch('https://dummyjson.com/quotes')
    .then((response) => response.json())
    .then((data) => data.quotes);
}

function* fetchData(): Generator<any, void, any> {
  try {
    const data = yield call(fetchApi);
    yield put(fetchDataSuccess(data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}

export function* watchFetchData() {
  yield takeLatest(fetchDataRequest.type, fetchData);
}
