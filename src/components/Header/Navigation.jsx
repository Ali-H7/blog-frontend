import { useEffect, useRef } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router';

function Navigation({ menuStatus, setMenuStatus }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuStatus) {
      dialog.show();
      document.body.style.overflow = 'hidden';
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuStatus]);

  return (
    <dialog className='h-full w-full bg-black/25 z-1' ref={dialogRef} onClick={() => setMenuStatus(false)}>
      <ul
        className='text-2xl p-4 space-y-2 h-full w-full bg-tea_green-DEFAULT max-w-2xs'
        onClick={(e) => e.stopPropagation()}
      >
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
    </dialog>
  );
}

export default Navigation;
