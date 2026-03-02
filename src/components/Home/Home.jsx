import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import Skeleton from 'react-loading-skeleton';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API;
    async function fetchData() {
      try {
        const response = await fetch(`${API}/`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
  }, []);

  if (isFetching) {
    return (
      <div className='p-8 flex flex-col gap-6'>
        {new Array(5).fill({}).map((post, i) => (
          <Skeleton key={i} count={5} style={{ marginBottom: '0.5rem' }} />
        ))}
      </div>
    );
  }

  return (
    <div className='p-8 flex flex-col gap-6'>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post}></BlogCard>
      ))}
    </div>
  );
}

export default Home;
