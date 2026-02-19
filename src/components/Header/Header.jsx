import { useState } from 'react';
import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import Navigation from './Navigation';
import Search from './Search';

function Header() {
  const [menuStatus, setMenuStatus] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);

  function toggleMenu() {
    const nextStatus = !menuStatus;
    setMenuStatus(nextStatus);
    if (!nextStatus) setSearchStatus(false);
  }

  return (
    <>
      <header className='flex justify-between items-center px-4 bg-amber-900 h-16'>
        <h1 className='text-3xl'>Blog</h1>
        <button className='hover:cursor-pointer p-2' onClick={toggleMenu}>
          {menuStatus ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
        </button>
      </header>
      {menuStatus && <Navigation onToggle={toggleSearch}></Navigation>}
    </>
  );
}

export default Header;
