import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

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
    <header className='flex justify-between items-center px-4 h-16 bg-beige-DEFAULT border-b border-tea_green-DEFAULT'>
      <h1 className='text-3xl'>Blog</h1>
      <button className='hover:cursor-pointer p-2' onClick={toggleMenu}>
        {menuStatus ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
      </button>
    </header>
  );
}

export default Header;
