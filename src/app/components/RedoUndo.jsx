'use client';

import { useDispatch, useSelector } from 'react-redux';

const RedoUndo = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);

  return (
    <div>
      <button onClick={() => dispatch({ type: 'FETCH_DATA_REQUEST' })}>Fetch Data</button>
      <button onClick={() => dispatch({ type: 'UNDO' })}>Undo</button>
      <button onClick={() => dispatch({ type: 'REDO' })}>Redo</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RedoUndo;
