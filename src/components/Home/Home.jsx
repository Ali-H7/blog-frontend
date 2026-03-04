import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import Skeleton from 'react-loading-skeleton';
import fetchData from '../../helpers/fetchData';
import RetryButton from '../shared/RetryButton';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const isNoPostFound = !isLoading && posts.length === 0;

  function retry() {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setRetryCount((prev) => prev + 1), 500);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = { signal };
    async function getPosts() {
      try {
        const data = await fetchData('/', options);
        const posts = data.posts;
        setPosts(posts);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getPosts();
  }, [retryCount]);

  const RetryProps = { error, retry };
  const parentClasses = 'p-8 flex flex-col gap-6';

  if (error) {
    return (
      <div className={parentClasses}>
        <RetryButton {...RetryProps} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={parentClasses}>
        {new Array(5).fill({}).map((_, i) => (
          <Skeleton key={i} count={5} style={{ marginBottom: '0.5rem' }} />
        ))}
      </div>
    );
  }

  if (isNoPostFound) {
    return (
      <div className={parentClasses}>
        <p className='text-center'>No Posts Found</p>
      </div>
    );
  }

  return (
    <div className={parentClasses}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post}></BlogCard>
      ))}
    </div>
  );
}

export default Home;
