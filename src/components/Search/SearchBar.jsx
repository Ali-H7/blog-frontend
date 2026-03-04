import { Search as SearchIcon, X as XIcon } from 'lucide-react';

function SearchBar({ searchQuery, syncSearchStates, setIsLoading }) {
  return (
    <div className='relative'>
      <SearchIcon className='absolute left-2 top-1/2 -translate-y-1/2'></SearchIcon>
      <input
        className='h-full w-full px-9 py-2 rounded-xl bg-tea_green-DEFAULT border-0'
        type='text'
        placeholder='Search'
        value={searchQuery}
        onChange={(e) => {
          setIsLoading(true);
          syncSearchStates(e.target.value);
        }}
      />
      {searchQuery.length > 0 && (
        <button
          onClick={() => {
            syncSearchStates('');
          }}
        >
          <XIcon className='absolute right-2 top-1/2 -translate-y-1/2 hover:cursor-pointer'></XIcon>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
