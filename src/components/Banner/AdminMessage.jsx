import { Link, useLocation } from 'react-router';
function AdminMessage({ user }) {
  const location = useLocation();
  const isControlPanel = location.pathname === '/cp';
  return (
    <p className='text-center'>
      Welcome, <span className='font-bold'>{user.userName}</span> You're are logged in as an{' '}
      <span className='font-bold'>Admin</span>
      {!isControlPanel && (
        <>
          <span className='mx-2'>•</span>
          <Link to='/cp'>
            <button className='text-tea_green-200 font-bold underline hover:cursor-pointer'>Control Panel</button>
          </Link>
        </>
      )}
    </p>
  );
}

export default AdminMessage;
