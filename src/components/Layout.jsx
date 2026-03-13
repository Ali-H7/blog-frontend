import Header from './Header/Header';
import Navigation from './Header/Navigation';
import { useState } from 'react';

function Layout({ children }) {
  const [menuStatus, setMenuStatus] = useState(false);
  const props = { menuStatus, setMenuStatus };

  return (
    <div className='flex h-full min-h-screen flex-col'>
      <Header {...props}></Header>
      <div className='relative flex flex-1 flex-col items-center'>
        <Navigation {...props}></Navigation>
        {children}
      </div>
    </div>
  );
}
export default Layout;
