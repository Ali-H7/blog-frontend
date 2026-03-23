import useFetch from '../../hooks/useFetch';
import BlogCard from './BlogCard';
import Skeleton from 'react-loading-skeleton';
import RetryButton from '../shared/RetryButton';

function Home() {
  const { error, loading, data, retry } = useFetch('/posts');
  const retryProps = { error, retry };
  const parentClasses = 'p-8 flex flex-col gap-6';

  if (error) {
    return (
      <div className={parentClasses}>
        <RetryButton {...retryProps} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={parentClasses}>
        {new Array(5).fill({}).map((_, i) => (
          <Skeleton key={i} count={5} style={{ marginBottom: '0.5rem' }} />
        ))}
      </div>
    );
  }

  if (data.posts.length === 0) {
    return (
      <div className={parentClasses}>
        <p className='text-center'>No Posts Found</p>
      </div>
    );
  }

  return (
    <div className={parentClasses}>
      {data.posts.map((post) => (
        <BlogCard key={post.id} post={post}></BlogCard>
      ))}
    </div>
  );
}

export default Home;
