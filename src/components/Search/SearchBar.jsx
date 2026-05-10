import { Search as SearchIcon, X as XIcon } from 'lucide-react';

function SearchBar({ searchQuery, syncSearchStates }) {
  return (
    <div className='relative'>
      <SearchIcon className='absolute top-1/2 left-2 -translate-y-1/2'></SearchIcon>
      <input
        className='bg-tea_green-DEFAULT h-full w-full rounded-xl border-0 px-9 py-2'
        type='text'
        placeholder='Search'
        value={searchQuery}
        onChange={(e) => {
          syncSearchStates(e.target.value);
        }}
      />
      {searchQuery.length > 0 && (
        <button
          onClick={() => {
            syncSearchStates('');
          }}
        >
          <XIcon className='absolute top-1/2 right-2 -translate-y-1/2 hover:cursor-pointer'></XIcon>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
