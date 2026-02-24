import { useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import Navigation from './components/Header/Navigation';

function App() {
  const [menuStatus, setMenuStatus] = useState(false);

  return (
    <div className='min-h-screen h-full flex flex-col'>
      <Header menuStatus={menuStatus} setMenuStatus={setMenuStatus}></Header>
      <div className='flex flex-col flex-1 relative'>
        {menuStatus && <Navigation></Navigation>}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
