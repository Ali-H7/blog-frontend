import { EyeOff as EyeOffIcon, Eye as EyeIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import fetchData from '../../helpers/fetchData';
import { LoaderCircle as LoadingIcon } from 'lucide-react';
import RetryButton from '../shared/RetryButton';
import checkLoginStatus from '../../helpers/checkLoginStatus';

function Login() {
  const isUserLoggedIn = checkLoginStatus();
  if (isUserLoggedIn) window.location.replace('/cp');

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisisble, setIsPasswordVisisble] = useState(false);
  const passowrdInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [error, setError] = useState(null);

  function togglePasswordVisibility() {
    setIsPasswordVisisble((status) => !status);
    passowrdInput.current.focus();
  }

  function handleUserInput(setCb, input) {
    setCb(input);
    setIsLoginFailed(false);
  }

  function retry() {
    setUserName('');
    setPassword('');
    setIsPasswordVisisble(false);
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
      localStorage.setItem('userData', JSON.stringify(userData));
      window.location.replace('/cp');
    } catch (err) {
      if (err.status === 400 || 401) {
        setIsLoginFailed(true);
        setPassword('');
        setIsPasswordVisisble(false);
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        handleLoginRequest();
      }}
    >
      <div className='flex flex-col items-center p-8'>
        <h1 className='text-center text-xl font-bold'>Admin Login</h1>
        <h3 className={`mb-4 text-red-600 ${isLoginFailed ? 'visible' : 'invisible'}`}>Incorrect username/password</h3>
        <div className='flex max-w-100 flex-col gap-4'>
          <input
            className='bg-tea_green-DEFAULT rounded-md border p-2 focus:border-2'
            type='text'
            name='userName'
            id='userName'
            placeholder='Username'
            value={userName}
            onChange={(e) => handleUserInput(setUserName, e.target.value)}
            required
          />
          <div className='relative'>
            <input
              ref={passowrdInput}
              className='bg-tea_green-DEFAULT rounded-md border p-2 focus:border-2'
              type={isPasswordVisisble ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => handleUserInput(setPassword, e.target.value)}
              required
            />
            <button
              className='absolute top-1/2 right-2 w-fit -translate-y-1/2 hover:cursor-pointer'
              type='button'
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisisble ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          <button
            className='bg-tea_green-500 hover:bg-tea_green-400 flex justify-center gap-2 rounded-md p-2 font-bold hover:cursor-pointer'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <LoadingIcon className='animate-spin' /> : <p>Login</p>}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
