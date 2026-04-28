import Skeleton from 'react-loading-skeleton';
import RetryButton from '../shared/RetryButton';
import { Link } from 'react-router';

function SearchResults({ error, retry, isLoading, isNoPostFound, posts }) {
  if (error) {
    const RetryButtonProps = { error, retry };
    return (
      <div className='py-8'>
        <RetryButton {...RetryButtonProps} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <ul className='space-y-4 py-8'>
        {new Array(3).fill({}).map((_, i) => (
          <li className='bg-tea_green-DEFAULT space-y-2 rounded-lg p-6' key={i}>
            <Skeleton />
            <Skeleton count={3} />
          </li>
        ))}
      </ul>
    );
  }

  if (isNoPostFound) {
    return (
      <p className='py-8 text-center'>We couldn't find any posts for that search. Maybe try different keywords?</p>
    );
  }

  return (
    <ul className='space-y-4 py-8'>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.slug}`}>
            <div className='bg-tea_green-DEFAULT rounded-lg p-6'>
              <h1 className='mb-2 truncate text-xl font-bold'>{post.title}</h1>
              <p>{post.content}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default SearchResults;
