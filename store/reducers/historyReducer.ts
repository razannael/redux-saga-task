import { combineReducers } from '@reduxjs/toolkit';
import dataReducer from './dataReducer';

// Undoable function
function undoable(reducer: any) {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  return function (state = initialState, action: any) {
    const { past, present, future } = state;

    switch (action.type) {
      case 'UNDO':
        if (past.length === 0) return state;
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);
        return {
          past: newPast,
          present: previous,
          future: [present, ...future],
        };
      case 'REDO':
        if (future.length === 0) return state;
        const next = future[0];
        const newFuture = future.slice(1);
        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      default:
        // Delegate handling the action to the passed reducer
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state; // No change in state
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [], // Clear the future state on new actions
        };
    }
  };
}

// Wrap your data reducer with undoable
const rootReducer = combineReducers({
  data: undoable(dataReducer),
  // Add other reducers here if necessary
});

export default rootReducer;
