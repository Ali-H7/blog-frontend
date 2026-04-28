import useFetch from '../../hooks/useFetch';
import BlogCard from './BlogCard';
import Skeleton from 'react-loading-skeleton';
import RetryButton from '../shared/RetryButton';
import { useAuth } from '../../context/AuthContext';
import { useLocation, Navigate } from 'react-router';

function Home() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  const location = useLocation();
  const isControlPanel = location.pathname === '/cp/posts';
  if (isControlPanel && !isAdmin) return <Navigate to='/' replace />;
  const route = isAdmin && isControlPanel ? '/admin/posts' : '/posts';
  const options = {};

  if (isAdmin) {
    options.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    };
  }

  const { error, loading, data, setData, retry } = useFetch(route, { options, fetch: true });
  const retryProps = { error, retry };
  const parentClasses = 'p-8 flex flex-col gap-6';

  function deletePost(postId) {
    setData((prevData) => {
      const { posts } = prevData;
      const updatedPost = posts.filter((post) => post.id !== postId);
      return { posts: updatedPost };
    });
  }

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
        <BlogCard
          key={post.id}
          post={post}
          deletePost={deletePost}
          user={user}
          isControlPanel={isControlPanel}
        ></BlogCard>
      ))}
    </div>
  );
}

export default Home;
