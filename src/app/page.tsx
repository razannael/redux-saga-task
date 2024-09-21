'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchDataRequest } from '../../store/reducers/dataReducer';
import { undo, redo } from '../../store/reducers/historyReducer';

export default function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.data);
  const { past, future } = useSelector((state: RootState) => state.history);

  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  return (
    <div>
      <h1>Quotes List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {data.map((item) => (
          <li  key={item.id}>{item.quote}</li>
        ))}
      </ul>
{/* 
      <button onClick={() => dispatch(undo())} disabled={past.length === 0}>
        Undo
      </button>
      <button onClick={() => dispatch(redo())} disabled={future.length === 0}>
        Redo
      </button> */}
    </div>
  );
}
