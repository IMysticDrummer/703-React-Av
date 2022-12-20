import { useEffect, useReducer, useState } from 'react';

const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const reducer = (state, action) => {
  if (action.type === FETCH_REQUEST) {
    return { ...state, isLoading: true };
  }
  if (action.type === FETCH_SUCCESS) {
    return { ...state, isLoading: false, data: action.payload };
  }
  if (action.type === FETCH_FAILURE) {
    return { ...state, isLoading: false, error: action.payload };
  }
  return state;
};

export default function useData({ initialState, url }) {
  const [state, dispatch] = useReducer(reducer, {
    data: initialState,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: FETCH_REQUEST });
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        response.json();
      })
      .then((result) => dispatch({ type: FETCH_SUCCESS, payload: result.data }))
      .catch((error) =>
        dispatch({ type: FETCH_FAILURE, error: true, payload: error })
      );
  }, [url]);

  return state;
}
