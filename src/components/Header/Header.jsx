import { KeyRound, Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import NavigationDesktop from './NavigationDesktop';

function Header({ menuStatus, setMenuStatus }) {
  const location = useLocation();

  useEffect(() => {
    setMenuStatus(false);
  }, [location]);

  function toggleMenu() {
    const nextStatus = !menuStatus;
    setMenuStatus(nextStatus);
  }

  return (
    <header className='bg-beige-DEFAULT border-tea_green-DEFAULT flex h-16 items-center justify-center border-b'>
      <div className='flex h-full w-full max-w-5xl items-center justify-between px-4'>
        <Link to='/'>
          <h1 className='text-3xl'>Blog</h1>
        </Link>
        <button className='p-2 hover:cursor-pointer sm:hidden' onClick={toggleMenu}>
          {menuStatus ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
        </button>
        <NavigationDesktop />
      </div>
    </header>
  );
}

export default Header;
