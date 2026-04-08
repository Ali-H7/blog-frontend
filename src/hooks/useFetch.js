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
    setLoading(true);
    setError(null);
    setTimeout(() => setRetryCount((prev) => prev + 1), 500);
  }

  async function triggerFetch(updatedConfig = {}) {
    if (!loading) setLoading(true);
    if (error) setError(null);
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    const signal = controller.signal;
    controllerRef.current = controller;

    config.current = { ...config.current, ...updatedConfig };
    const currentOptions = config.current.options;

    try {
      const response = await fetch(`${API}${route}`, { ...currentOptions, signal });
      const blob = await response.text();
      const json = blob ? JSON.parse(blob) : {};
      if (!response.ok) {
        const { error, validationErrors } = json;
        const serverErr = new Error(error || 'Something went wrong');
        serverErr.status = response.status || 500;
        serverErr.validationErrors = validationErrors ?? [];
        throw serverErr;
      }
      setData(json);
      return json;
    } catch (err) {
      if (err.name === 'AbortError') return;
      if (err.message === 'Failed to fetch') err.message = 'Cannot reach the server';
      setError(err.message);
      throw err;
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (retryCount > 3) throw new Error('Something went wrong');
    if (!config.current.fetch) return;

    triggerFetch(config.current);

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [retryCount]);

  return { error, setError, loading, setLoading, data, setData, retry, retryCount, setRetryCount, triggerFetch };
}

export default useFetch;
