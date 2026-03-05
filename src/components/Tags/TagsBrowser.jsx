import { useState, useEffect } from 'react';
import fetchData from '../../helpers/fetchData';
import { useParams, Link } from 'react-router';
import BlogCard from '../Home/BlogCard';
import { ArrowLeft as LeftArrowIcon } from 'lucide-react';
import formatTagName from '../../helpers/formatTagName';

function TagsBrowser() {
  const { slug } = useParams();
  const [tag, setTag] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const posts = tag.posts ?? [];

  function retry() {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setRetryCount((prev) => prev + 1), 500);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const options = { signal };

    async function getPosts() {
      try {
        const data = await fetchData(`/tags/${slug}`, options);
        const tag = data.tag;
        setTag({ ...tag, name: formatTagName(tag.name) });
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        if (!signal.aborted) setIsLoading(false);
      }
    }
    getPosts();

    return () => {
      controller.abort();
    };
  }, []);

  console.log(tag);

  return (
    <div className='px-4 py-8'>
      <Link to='/tags'>
        <div className='flex gap-2 mb-4 border-b border-transparent hover:border-black w-fit px-2'>
          <LeftArrowIcon />
          <p className=''>Back to Tags</p>
        </div>
      </Link>
      <h1 className='font-bold text-center mb-4 text-xl'>{tag.name} posts</h1>
      <div className='flex flex-col gap-6'>
        {posts.length > 0 && posts.map((post) => <BlogCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default TagsBrowser;
