import { useState } from 'react';
import { useLocation, Navigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import fetchData from '../../helpers/fetchData';
import BlogCard from './BlogCard';
import BlogCardLoading from './BlogCardLoading';
import RetryButton from '../shared/RetryButton';

function Posts() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  const location = useLocation();
  const isControlPanel = location.pathname === '/cp/posts';
  if (isControlPanel && !isAdmin) return <Navigate to='/' replace />;
  const route = isAdmin && isControlPanel ? '/admin/posts' : '/posts';

  const [retryCount, setRetryCount] = useState();
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: ({ signal }) => {
      const options = {
        signal,
        ...(isAdmin && {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }),
      };
      return fetchData(route, options);
    },
  });

  function retry() {
    setRetryCount((prevCount) => prevCount + 1);
    refetch();
  }

  if (isError && retryCount < 3) return <RetryButton error={error.message} retry={retry} />;
  else if (isError) return <Error error={error} />;

  return (
    <div className='flex flex-col gap-6 p-8'>
      {isLoading ? (
        <BlogCardLoading count={3} />
      ) : data.posts.length === 0 ? (
        <p className='text-center'>No Posts Found</p>
      ) : (
        data.posts.map((post) => <BlogCard key={post.id} post={post} user={user} isControlPanel={isControlPanel} />)
      )}
    </div>
  );
}

export default Posts;
