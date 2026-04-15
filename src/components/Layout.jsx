import Header from './Header/Header';
import Navigation from './Header/Navigation';
import Banner from './Banner/Banner';
import { useState } from 'react';

function Layout({ children }) {
  const [menuStatus, setMenuStatus] = useState(false);
  const props = { menuStatus, setMenuStatus };

  return (
    <div className='flex h-full min-h-screen flex-col'>
      <Header {...props}></Header>
      <Banner />
      <div className='relative flex flex-1 flex-col'>
        {menuStatus && <Navigation {...props}></Navigation>}
        <div className='h-full w-full max-w-4xl self-center'>{children}</div>
      </div>
    </div>
  );
}
export default Layout;
