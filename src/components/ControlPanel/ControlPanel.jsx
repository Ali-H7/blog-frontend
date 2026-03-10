import { Navigate, Link } from 'react-router';
import checkLoginStatus from '../../helpers/checkLoginStatus';

function ControlPanel() {
  const isUserLoggedIn = checkLoginStatus();
  if (!isUserLoggedIn) {
    return <Navigate to='/cp/login' replace />;
  }
  const data = localStorage.getItem('userData');
  const { user } = JSON.parse(data);

  const actionList = [{ text: 'Create a Post', link: '/cp/post' }];

  return (
    <div className='h-full w-full max-w-3xl p-4 text-center'>
      <p>
        Welcome <span className='font-bold'>{user.userName}</span>
      </p>
      <p className='mb-4'>Please choose an action</p>
      <ul className='bg-beige-DEFAULT space-y-4 rounded-md p-4 font-bold'>
        {actionList.map((action, i) => (
          <li key={i} className='bg-tea_green-DEFAULT hover:bg-tea_green-400 rounded-md transition-colors'>
            <Link to={action.link} className='block h-full w-full p-2'>
              {action.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ControlPanel;
