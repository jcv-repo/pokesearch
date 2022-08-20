import { useRef } from "react";

export const useFetching = () => {
  const fetching = useRef([]);

  const getFetching = () => fetching.current;

  const findIndexInFetchState = (id) =>
    fetching.current.findIndex((fetch) => fetch.id === id);

  const addToFetchState = (id, promise) => {
    if (findIndexInFetchState(id) === -1) {
      fetching.current.push({ id: id, promise: promise });
    }
  };
  const removeFromFetchState = (id) => {
    if (findIndexInFetchState(id) !== -1) {
      fetching.current = fetching.current.filter((item) => item.id !== id);
    }
  };

  return {
    getFetching,
    findIndexInFetchState,
    addToFetchState,
    removeFromFetchState,
  };
};
