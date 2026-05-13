import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../../helpers/fetchData';
import formatTagName from '../../helpers/formatTagName';
import BlogCard from '../Home/BlogCard';
import BlogCardLoading from '../Home/BlogCardLoading';
import Skeleton from 'react-loading-skeleton';
import { ArrowLeft as LeftArrowIcon } from 'lucide-react';

function TagsBrowser() {
  const { slug } = useParams();
  const [retryCount, setRetryCount] = useState(0);
  const { data, isError, isPending, error, refetch } = useQuery({
    queryKey: ['tag', slug],
    queryFn: ({ signal }) => {
      return fetchData(`/tags/${slug}`, { signal });
    },
    select: (fetchedData) => ({ ...fetchedData.tag, name: formatTagName(fetchedData.tag.name) }),
  });

  function retry() {
    setRetryCount((prevCount) => prevCount + 1);
    refetch();
  }

  if (isError && retryCount < 3) return <RetryButton error={error.message} retry={retry} />;
  else if (isError) return <Error error={error} />;

  return (
    <div className='px-4 py-8'>
      <Link to='/tags'>
        <div className='mb-4 flex w-fit gap-2 border-b border-transparent px-2 hover:border-black'>
          <LeftArrowIcon />
          <p className=''>Back to Tags</p>
        </div>
      </Link>
      <h1 className='mb-4 text-center text-xl font-bold'>
        {isPending ? <Skeleton width={'128px'} /> : `${data.name} posts`}
      </h1>
      <div className='flex flex-col gap-6'>
        {isPending ? (
          <BlogCardLoading count={3} />
        ) : (
          data.posts.length > 0 && data.posts.map((post) => <BlogCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default TagsBrowser;
