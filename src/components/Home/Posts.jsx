import { useQuery } from '@tanstack/react-query';
import BlogCard from './BlogCard';
import Skeleton from 'react-loading-skeleton';
import RetryButton from '../shared/RetryButton';
import { useAuth } from '../../context/AuthContext';
import { useLocation, Navigate } from 'react-router';
import fetchData from '../../helpers/fetchData';

function Posts() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  const location = useLocation();
  const isControlPanel = location.pathname === '/cp/posts';
  if (isControlPanel && !isAdmin) return <Navigate to='/' replace />;
  const route = isAdmin && isControlPanel ? '/admin/posts' : '/posts';

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

  const parentClasses = 'p-8 flex flex-col gap-6';

  if (isError) return <RetryButton error={error.message} retry={refetch} />;

  if (isLoading) {
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
        <BlogCard key={post.id} post={post} user={user} isControlPanel={isControlPanel}></BlogCard>
      ))}
    </div>
  );
}

export default Posts;
