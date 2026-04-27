import { useState } from 'react';
import fetchData from '../../helpers/fetchData';
import { LoaderCircle as LoadingIcon } from 'lucide-react';
import RetryButton from '../shared/RetryButton';
import { Navigate, useNavigate } from 'react-router';
import UserNameInput from './UserNameInput';
import PasswordInput from './PasswordInput';
import { Link } from 'react-router';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const { user, login } = useAuth();
  if (user) return <Navigate to='/' replace />;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const passwordOptions = {
    name: 'password',
    id: 'password',
    placeholder: 'Password',
    value: password,
    setter: (passInput) => handleUserInput(setPassword, passInput),
    error: '',
  };

  function handleUserInput(setCb, input) {
    setCb(input);
    setIsLoginFailed(false);
  }

  function retry() {
    setUserName('');
    setPassword('');
    setIsLoading(false);
    setIsLoginFailed(false);
    setError(null);
  }

  async function handleLoginRequest() {
    setIsLoginFailed(false);
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
      }),
      signal,
    };

    try {
      const userData = await fetchData('/login', options);
      login(userData);
      navigate('/', { replace: true });
    } catch (err) {
      if (err.status === 400 || err.status === 401) {
        setIsLoginFailed(true);
        setPassword('');
      } else {
        setError(err.message);
      }
    } finally {
      if (!signal.aborted) setIsLoading(false);
    }
  }

  const errorProps = { error, retry };

  if (error) {
    return (
      <div className='p-8'>
        <RetryButton {...errorProps} />
      </div>
    );
  }

  return (
    <div className='flex justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        <h1 className='text-center text-3xl font-bold'>Login</h1>
        <div className='bg-tea_green-700 mt-12 space-y-8 rounded-md p-8'>
          <form
            className='space-y-8'
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              handleLoginRequest();
            }}
          >
            {isLoginFailed && <h3 className='text-center text-red-600'>Incorrect username/password</h3>}
            <UserNameInput userName={userName} setUserName={(userInput) => handleUserInput(setUserName, userInput)} />
            <PasswordInput options={passwordOptions} />
            <button
              className='bg-papaya_whip-400 hover:bg-papaya_whip-300 flex w-full justify-center gap-4 rounded-md p-2 font-bold hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <LoadingIcon className='animate-spin' /> : <p>Login</p>}
            </button>
          </form>
          <p className='text-center'>
            Don't have an account?
            <Link to='/signup'>
              <span className='font-bold'> Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
