import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  addItem
} from '../reducers/dataReducer';

// API call for fetching data
function fetchApi() {
  return fetch('https://retoolapi.dev/1Pa4qo/data').then((response) => response.json());
}

// Saga to handle data fetching
function* fetchData(): Generator<any, void, any> {
  try {
    const data = yield call(fetchApi);
    yield put(fetchDataSuccess(data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}

// Watcher for ADD_ITEM action
function* addItemSaga(action: { type: string; payload: any }) {
  yield put(addItem(action.payload));  // Add item to the present state
}



// Watcher to handle FETCH_DATA_REQUEST action
export function* watchFetchData() {
  yield takeLatest(fetchDataRequest.type, fetchData);
}

// Watcher for ADD_ITEM, UPDATE_ITEM, DELETE_ITEM actions
export function* watchCrudOperations() {
  yield takeLatest('ADD_ITEM', addItemSaga);
}

// Combine sagas
export function* rootSaga() {
  yield all([watchFetchData(), watchCrudOperations()]);
}
