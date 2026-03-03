async function fetchData(route, signal) {
  try {
    const options = {};
    if (signal) {
      options.signal = signal;
    }

    const API = import.meta.env.VITE_API;
    const response = await fetch(`${API}${route}`, options);
    const data = await response.json();

    if (!response.ok) {
      const { error } = data;
      throw new Error(error || 'Something went wrong');
    }

    return { data, err: null };
  } catch (err) {
    return { err, data: null };
  }
}
export default fetchData;
