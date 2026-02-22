import { Search as SearchIcon } from 'lucide-react';

function Navigation({ children, onToggle }) {
  return (
    <div className='flex flex-col flex-1 relative'>
      <ul className='flex-1 text-2xl bg-amber-200 max-w-3xs p-4 space-y-2'>
        <li>Home</li>
        <li className='flex gap-2 w-fit cursor-pointer' onClick={onToggle}>
          Search
          <button className='cursor-pointer'>
            <SearchIcon></SearchIcon>
          </button>
        </li>
      </ul>
      {children}
    </div>
  );
}

export default Navigation;
