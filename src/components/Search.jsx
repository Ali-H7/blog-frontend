import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Search as SearchIcon, X as XIcon } from 'lucide-react';
import truncate from '../helpers/truncate';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const listToRender = isLoading ? new Array(3).fill({}) : posts;
  const noPostFound = !isLoading && searchQuery.length > 0 && posts.length === 0;
  const location = useLocation();

  useEffect(() => {
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let timer;

    const API = import.meta.env.VITE_API;
    async function fetchData() {
      try {
        const response = await fetch(`${API}/posts/search?query=${searchQuery}`, { signal });
        const data = await response.json();
        const uncleanedPosts = data.posts;
        const cleanedPosts = uncleanedPosts.map((post) => ({ ...post, content: truncate(post.content, 96) }));
        setPosts(cleanedPosts);
      } catch (error) {
        console.error(error);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    if (searchQuery.length > 0) {
      timer = setTimeout(fetchData, 500);
    } else {
      setIsLoading(false);
      setPosts([]);
    }

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  return (
    <div className='bg-cornsilk-DEFAULT flex-1 min-h-full w-screen p-4'>
      <div className='relative'>
        <SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2'></SearchIcon>
        <input
          className='h-full w-full px-9 py-2 rounded-xl bg-tea_green-DEFAULT border-0'
          type='text'
          placeholder='Search'
          value={searchQuery}
          onChange={(e) => {
            setIsLoading(true);
            setSearchQuery(e.target.value);
          }}
        />
        {searchQuery.length > 0 && (
          <button
            onClick={() => {
              setSearchQuery('');
            }}
          >
            <XIcon className='absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer'></XIcon>
          </button>
        )}
      </div>
      {noPostFound ? (
        <p className='text-center py-8'>We couldn't find any posts for that search. Maybe try different keywords?</p>
      ) : (
        <ul className='py-8 space-y-4'>
          {listToRender.map((post, i) => (
            <li className='p-6 rounded-lg space-y-2 bg-beige-DEFAULT' key={post.id || i}>
              <h1 className='font-bold text-xl truncate'>{post.title || <Skeleton />}</h1>
              <p>{post.content || <Skeleton count={3} />}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
