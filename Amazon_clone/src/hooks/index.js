import { useCallback, useState } from "react";

/**
 * useAsync Hook
 * Manages async operation state (loading, error, data)
 */
export const useAsync = (asyncFunction, immediate = true) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    setStatus("pending");
    setValue(null);
    setError(null);

    try {
      const response = await asyncFunction(...params);
      setValue(response);
      setStatus("success");
      return response;
    } catch (err) {
      setError(err);
      setStatus("error");
      throw err;
    }
  }, [asyncFunction]);

  return { execute, status, value, error };
};

/**
 * useFetch Hook
 * Fetches data from an endpoint on mount
 */
export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFn]);

  // Fetch on mount or dependency change
  React.useEffect(() => {
    refetch();
  }, dependencies);

  return { data, isLoading, error, refetch };
};

/**
 * useLocalStorage Hook
 * Manages local storage with React state
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
};

/**
 * useDebounce Hook
 * Debounces a value
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * usePagination Hook
 * Manages pagination state
 */
export const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const goToPage = (newPage) => setPage(newPage);
  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(1, prev - 1));
  const setPageSize = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return {
    page,
    limit,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
  };
};
