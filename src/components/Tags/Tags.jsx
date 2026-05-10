import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import fetchData from '../../helpers/fetchData';
import Skeleton from 'react-loading-skeleton';
import RetryButton from '../shared/RetryButton';

function Tags() {
  const { data, isError, isPending, error, refetch } = useQuery({
    queryKey: ['tags'],
    queryFn: ({ signal }) => {
      return fetchData(`/tags`, { signal });
    },
  });

  const parentClasses = 'flex flex-col items-center p-8 gap-2 min-w-full';

  if (isError) return <RetryButton error={error.message} retry={refetch} />;

  if (isPending) {
    return (
      <div className={parentClasses}>
        <Skeleton width={'5.5rem'} height={'2rem'} />
        <Skeleton width={'80vw'} height={'24rem'} />
      </div>
    );
  }

  if (!isPending && data?.tags?.length === 0) {
    return (
      <div className={parentClasses}>
        <p className='text-center'>No Tags Available</p>
      </div>
    );
  }

  return (
    <div className={parentClasses}>
      <h1 className='text-2xl font-bold'>Tag List</h1>
      <ul className='bg-tea_green-DEFAULT flex min-w-full flex-wrap justify-center gap-4 rounded-sm p-2'>
        {data?.tags?.map((tag) => (
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
