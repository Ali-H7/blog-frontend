import Skeleton from 'react-loading-skeleton';
import RetryButton from '../shared/RetryButton';

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
      <ul className='py-8 space-y-4'>
        {new Array(3).fill({}).map((_, i) => (
          <li className='p-6 rounded-lg space-y-2 bg-tea_green-DEFAULT' key={i}>
            <Skeleton />
            <Skeleton count={3} />
          </li>
        ))}
      </ul>
    );
  }

  if (isNoPostFound) {
    return (
      <p className='text-center py-8'>We couldn't find any posts for that search. Maybe try different keywords?</p>
    );
  }

  return (
    <ul className='py-8 space-y-4'>
      {posts.map((post) => (
        <li className='p-6 rounded-lg space-y-2 bg-tea_green-DEFAULT' key={post.id}>
          <h1 className='font-bold text-xl truncate'>{post.title}</h1>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
}
export default SearchResults;
