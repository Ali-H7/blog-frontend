async function fetchData(route, options = {}) {
  try {
    const API = import.meta.env.VITE_API;
    const response = await fetch(`${API}${route}`, options);
    const data = await response.json();
    if (!response.ok) {
      const { error } = data;
      const newError = new Error(error || 'Something went wrong');
      newError.status = response.status || 500;
      throw newError;
    }

    return data;
  } catch (err) {
    if (err.message === 'Failed to fetch') err.message = 'Cannot reach the server';
    throw err;
  }
}
export default fetchData;
