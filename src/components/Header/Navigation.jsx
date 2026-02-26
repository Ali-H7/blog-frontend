import { Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router';

function Navigation() {
  return (
    <ul className='fixed min-h-full w-full text-2xl bg-amber-200 max-w-2xs p-4 space-y-2 z-1'>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link className='flex gap-2 w-fit cursor-pointer items-center' to='/search'>
          Search
          <SearchIcon></SearchIcon>
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
