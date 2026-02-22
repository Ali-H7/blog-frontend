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

  function toggleSearch() {
    setSearchStatus((status) => !status);
  }

  return (
    <>
      <header className='flex justify-between items-center px-4 h-16 border-b border-light_bronze-DEFAULT'>
        <h1 className='text-3xl'>Blog</h1>
        <button className='hover:cursor-pointer p-2' onClick={toggleMenu}>
          {menuStatus ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
        </button>
      </header>
      {menuStatus && <Navigation onToggle={toggleSearch}>{searchStatus && <Search></Search>}</Navigation>}
    </>
  );
}

export default Header;
