'use client'; // Ensure this is at the top for client-side rendering

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchDataRequest } from '../../store/reducers/dataReducer'; // Import fetch action
import { RootState } from '../../store/store';

export default function Home() {
  const dispatch = useDispatch();
  const { past, present, future } = useSelector((state: RootState) => state.history.data); // Correct state selection

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchDataRequest());  // Dispatch action to fetch data
  }, [dispatch]);

  const handleUndo = () => {
    if (past.length > 0) {
      dispatch({ type: 'UNDO' });
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      dispatch({ type: 'REDO' });
    }
  };

  const handleAddItem = () => {
    const inputElement = document.getElementById('input') as HTMLInputElement;
    const inputValue = inputElement ? inputElement.value : '';
    dispatch({ type: 'ADD_ITEM', payload: { id: Date.now(), quotes: inputValue } });
  };

  return (
    <div className="quotes-list">
      <h1>Quotes List</h1>
      <ul>
        {present.data.map((item: any) => (
          <li key={item.id}>{item.quotes}</li>
        ))}
      </ul>
      <div className="add-quote">
      <input id='input' type="text" placeholder="Add Quote" />
      <button onClick={handleAddItem}>Add Quote</button>
      </div>
      <div className="undo-redo">
      <button onClick={handleUndo} disabled={past.length === 0}>Undo</button>
      <button onClick={handleRedo} disabled={future.length === 0}>Redo</button>
      </div>

    </div>
  );
}
