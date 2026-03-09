import { EyeOff as EyeOffIcon, Eye as EyeIcon } from 'lucide-react';
import { useState, useRef } from 'react';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisisble, setIsPasswordVisisble] = useState(false);
  const passowrdInput = useRef(null);

  function toggleVisibility() {
    setIsPasswordVisisble((status) => !status);
    passowrdInput.current.focus();
  }

  return (
    <form action=''>
      <div className='flex flex-col items-center p-8'>
        <h1 className='mb-4 text-center text-xl font-bold'>Admin Login</h1>
        <div className='flex max-w-100 flex-col gap-4'>
          <input
            className='bg-tea_green-DEFAULT rounded-md border p-2 focus:border-2'
            type='text'
            name='userName'
            id='userName'
            placeholder='Username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className='absolute top-1/2 right-2 w-fit -translate-y-1/2 hover:cursor-pointer'
              type='button'
              onClick={toggleVisibility}
            >
              {isPasswordVisisble ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          <button className='bg-tea_green-500 hover:bg-tea_green-400 rounded-md p-2 font-bold hover:cursor-pointer'>
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

export default Login;
