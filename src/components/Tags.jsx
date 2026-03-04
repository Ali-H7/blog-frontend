import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import fetchData from '../helpers/fetchData';
import { Repeat2 as RetryIcon } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

function Tags() {
  const [tags, setTags] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const parentClassList = 'flex flex-col items-center p-8 gap-2 min-w-full';

  function retry() {
    setIsFetching(true);
    setRetryCount((prev) => prev + 1);
  }

  useEffect(() => {
    setError(null);
    const controller = new AbortController();
    const signal = controller.signal;
    const options = { signal };

    async function getTags() {
      try {
        const data = await fetchData('/tags', options);
        setTags(data.tags);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setError(error.message);
      } finally {
        if (!signal.aborted) setIsFetching(false);
      }
    }
    setTimeout(() => getTags(), 500);

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  if (error) {
    return (
      <div className={`${parentClassList} space-y-2`}>
        <p className='text-center'>{error}</p>
        <button
          className='bg-tea_green-DEFAULT py-2 px-6 rounded-lg font-bold hover:cursor-pointer hover:bg-tea_green-400 flex gap-2 items-center'
          onClick={retry}
        >
          <p>Retry </p>
          <RetryIcon />
        </button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className={parentClassList}>
        <Skeleton width={'5.5rem'} height={'2rem'} />
        <Skeleton width={'80vw'} height={'24rem'} />
      </div>
    );
  }

  if (!isFetching && tags.length === 0) {
    return (
      <div className={parentClassList}>
        <p className='text-center'>No Tags Available</p>
      </div>
    );
  }

  return (
    <div className={parentClassList}>
      <h1 className='text-2xl font-bold '>Tag List</h1>
      <ul className='p-2 bg-tea_green-DEFAULT rounded-sm min-w-full flex flex-wrap justify-center gap-4'>
        {tags.map((tag) => (
          <li key={tag.id} className='border-b border-transparent hover:border-black'>
            <Link to={`/tags/${tag.slug}`}>
              {tag.name}
              <span>{` [${tag._count.posts}]`}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Tags;
