import { useState, useEffect, useRef } from 'react';

function useFetch(route, additionalConfig = {}) {
  const API = import.meta.env.VITE_API;
  const config = useRef({ options: {}, fetch: true, ...additionalConfig });
  const controllerRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(config.current.fetch);

  function retry() {
    setError(null);
    setLoading(true);
    setTimeout(() => setRetryCount((prev) => prev + 1), 500);
  }

  async function triggerFetch(updatedConfig = {}) {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    const signal = controller.signal;
    controllerRef.current = controller;

    config.current = { ...config.current, ...updatedConfig };
    const currentOptions = config.current.options;

    try {
      const response = await fetch(`${API}${route}`, { ...currentOptions, signal });
      const json = await response.json();
      if (!response.ok) {
        const serverErr = new Error(json.error || 'Something went wrong');
        serverErr.status = response.status || 500;
        throw serverErr;
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

  useEffect(() => {
    if (!config.current.fetch) return;

    triggerFetch(config.current);

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [retryCount]);

  return { error, loading, data, retry, triggerFetch };
}

export default useFetch;
