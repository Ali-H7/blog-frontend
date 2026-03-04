import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import fetchData from '../helpers/fetchData';
import Skeleton from 'react-loading-skeleton';
import RetryButton from './shared/RetryButton';

function Tags() {
  const [tags, setTags] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const parentClasses = 'flex flex-col items-center p-8 gap-2 min-w-full';

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
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        if (!signal.aborted) setIsFetching(false);
      }
    }
    setTimeout(() => getTags(), 500);

    return () => {
      controller.abort();
    };
  }, [retryCount]);

  const RetryProps = { error, retry };

  if (error) {
    return (
      <div className={parentClasses}>
        <RetryButton {...RetryProps} />
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className={parentClasses}>
        <Skeleton width={'5.5rem'} height={'2rem'} />
        <Skeleton width={'80vw'} height={'24rem'} />
      </div>
    );
  }

  if (!isFetching && tags.length === 0) {
    return (
      <div className={parentClasses}>
        <p className='text-center'>No Tags Available</p>
      </div>
    );
  }

  return (
    <div className={parentClasses}>
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
