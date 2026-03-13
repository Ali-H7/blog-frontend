import { useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import Navigation from './components/Header/Navigation';

function App() {
  const [menuStatus, setMenuStatus] = useState(false);
  const props = { menuStatus, setMenuStatus };
  return (
    <div className='flex h-full min-h-screen flex-col'>
      <Header {...props}></Header>
      <div className='relative flex flex-1 flex-col items-center'>
        <Navigation {...props}></Navigation>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
