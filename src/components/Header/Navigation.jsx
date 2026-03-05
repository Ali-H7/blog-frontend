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
    <dialog className='z-1 h-full w-full bg-black/65' ref={dialogRef} onClick={() => setMenuStatus(false)}>
      <div className='bg-tea_green-DEFAULT flex h-full max-h-[calc(100vh-60px)] w-full max-w-2xs flex-col'>
        <ul className='flex-1 space-y-2 p-4 text-2xl' onClick={(e) => e.stopPropagation()}>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link className='flex w-fit cursor-pointer items-center gap-2' to='/search'>
              Search
              <SearchIcon></SearchIcon>
            </Link>
          </li>
          <li>
            <Link to='/tags'>Tags</Link>
          </li>
        </ul>
        <Link className='w-fit self-center' to='/control-panel'>
          <p className='p-4 text-xs'>Control Panel</p>
        </Link>
      </div>
    </dialog>
  );
}

export default Navigation;
