import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const API = import.meta.env.VITE_API;
    async function fetchData() {
      try {
        const response = await fetch(`${API}/`);
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className='p-8 flex flex-col gap-6'>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post}></BlogCard>
      ))}
    </div>
  );
}

export default Home;
