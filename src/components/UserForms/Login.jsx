import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import fetchData from '../../helpers/fetchData';
import UserNameInput from './UserNameInput';
import PasswordInput from './PasswordInput';
import { LoaderCircle as LoadingIcon } from 'lucide-react';
import RetryButton from '../shared/RetryButton';

function Login() {
  const { user, login } = useAuth();
  if (user) return <Navigate to='/' replace />;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const navigate = useNavigate();

  const [retryCount, setRetryCount] = useState(0);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: () => {
      setIsLoginFailed(false);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      };
      return fetchData('/login', options);
    },
    onSuccess: (userData) => {
      login(userData);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      if (err.status === 400 || err.status === 401) {
        reset();
        setIsLoginFailed(true);
        setPassword('');
      }
    },
  });

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
    reset();
  }

  function retry() {
    setRetryCount((prevCount) => prevCount + 1);
    setUserName('');
    setPassword('');
    setIsLoginFailed(false);
    reset();
  }

  if (isError && retryCount < 3 && !isLoginFailed) return <RetryButton error={error.message} retry={retry} />;
  else if (isError && !isLoginFailed) return <Error error={error} />;

  return (
    <div className='flex justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        <h1 className='text-center text-3xl font-bold'>Login</h1>
        <div className='bg-tea_green-700 mt-12 space-y-8 rounded-md p-8'>
          <form
            className='space-y-8'
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            {isLoginFailed && <h3 className='text-center text-red-600'>Incorrect username/password</h3>}
            <UserNameInput userName={userName} setUserName={(userInput) => handleUserInput(setUserName, userInput)} />
            <PasswordInput options={passwordOptions} />
            <button
              className='bg-papaya_whip-400 hover:bg-papaya_whip-300 flex w-full justify-center gap-4 rounded-md p-2 font-bold hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
              type='submit'
              disabled={isPending}
            >
              {isPending ? <LoadingIcon className='animate-spin' /> : <p>Login</p>}
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
