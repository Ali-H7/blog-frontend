import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import truncate from '../../helpers/truncate';
import fetchData from '../../helpers/fetchData';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const isNoPostFound = !isLoading && searchQuery.length > 0 && posts.length === 0;

  function retry() {
    setIsLoading(true);
    setRetryCount((prev) => prev + 1);
  }

  function syncSearchStates(input) {
    if (input) setSearchParams({ query: input });
    else setSearchParams((params) => params.delete('query'));
    setSearchQuery(input);
  }

  useEffect(() => {
    setError(null);
    const controller = new AbortController();
    const signal = controller.signal;
    const options = { signal };
    let timer;

    async function getPosts() {
      try {
        const data = await fetchData(`/posts/search?query=${searchQuery}`, options);
        const posts = data.posts;
        const formattedPosts = posts.map((post) => ({ ...post, content: truncate(post.content, 96) }));
        setPosts(formattedPosts);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    if (searchQuery.length > 0) {
      timer = setTimeout(getPosts, 500);
    } else {
      setIsLoading(false);
      setPosts([]);
    }

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, retryCount]);

  const searchProps = { searchQuery, syncSearchStates, setIsLoading };
  const searchResultsProps = { error, retry, isLoading, isNoPostFound, posts };

  return (
    <div className='flex-1 min-h-full w-screen p-4'>
      <SearchBar {...searchProps} />
      <SearchResults {...searchResultsProps} />
    </div>
  );
}

export default Search;
