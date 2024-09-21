

import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './dataReducer';
import historyReducer from './historyReducer';

const rootReducer = combineReducers({
  data: dataReducer,
  history: historyReducer,
});

export default rootReducer;
