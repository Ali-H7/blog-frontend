import { useState, useEffect } from 'react';

function useFetch(route, options = {}) {
  const API = import.meta.env.VITE_API;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        const response = await fetch(`${API}${route}`, { ...options, signal });
        const json = await response.json();
        if (!response.ok) {
          const newError = new Error(json.error || 'Something went wrong');
          newError.status = response.status || 500;
          throw newError;
        }
        setData(json);
      } catch (err) {
        if (err.name === 'AbortError') return;
        if (err.message === 'Failed to fetch') err.message = 'Cannot reach the server';
        setError(err.message);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();
  }, []);

  return { error, loading, data };
}
export default useFetch;
