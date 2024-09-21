import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryState {
  past: any[];  // Array to store past states
  present: any; // Current state
  future: any[]; // Array to store future states
}

const initialState: HistoryState = {
  past: [],
  present: {},
  future: []
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addState: (state, action: PayloadAction<any>) => {
      state.past.push(state.present);
      state.present = action.payload;
      state.future = [];
    },
    undo: (state) => {
      if (state.past.length === 0) return;
      const previous = state.past.pop();
      state.future.push(state.present);
      state.present = previous;
    },
    redo: (state) => {
      if (state.future.length === 0) return;
      const next = state.future.pop();
      state.past.push(state.present);
      state.present = next;
    }
  }
});

export const { addState, undo, redo } = historySlice.actions;
export default historySlice.reducer;
