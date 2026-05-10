import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import truncate from '../../helpers/truncate';
import fetchData from '../../helpers/fetchData';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '../../hooks/useDebounce';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');
  const debouncedSearchTerm = useDebounce(searchQuery, 500);

  const { data, isError, isFetching, error, refetch } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: ({ signal }) => {
      return fetchData(`/posts/search?query=${debouncedSearchTerm}`, { signal });
    },
    enabled: debouncedSearchTerm.length > 0,
  });

  const isNoPostFound = !isFetching && searchQuery.length > 0 && data?.posts?.length === 0;

  function syncSearchStates(input) {
    if (input) setSearchParams({ query: input });
    else setSearchParams((params) => params.delete('query'));
    setSearchQuery(input);
  }

  const searchProps = { searchQuery, syncSearchStates };
  const searchResultsProps = {
    isError,
    error,
    retry: refetch,
    isFetching,
    isNoPostFound,
    posts: data?.posts?.map((post) => ({ ...post, content: truncate(post.rawText, 96) })),
  };

  return (
    <div className='min-h-full w-full flex-1 px-4 py-8'>
      <SearchBar {...searchProps} />
      {searchQuery.length > 0 && <SearchResults {...searchResultsProps} />}
    </div>
  );
}

export default Search;
