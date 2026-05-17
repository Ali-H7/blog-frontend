import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import fetchData from '../../helpers/fetchData';
import UserNameInput from './UserNameInput';
import PasswordInput from './PasswordInput';
import { LoaderCircle as LoadingIcon } from 'lucide-react';
import RetryButton from '../shared/RetryButton';

function SignUp() {
  const { user } = useAuth();
  if (user) return <Navigate to='/' replace />;

  const initialValidationErrors = {
    userName: '',
    password: '',
    confirmPassword: '',
  };

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState(initialValidationErrors);
  const navigate = useNavigate();

  const [retryCount, setRetryCount] = useState(0);
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
          confirmPassword,
        }),
      };
      return fetchData('/signup', options);
    },
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      const { validationErrors } = err;
      if (validationErrors && validationErrors.length > 0) {
        reset();
        const mappedErrors = validationErrors.map((validationErr) => ({ [validationErr.path]: validationErr.msg }));
        const finalValidationErrors = Object.assign(...mappedErrors);
        const errorObject = { ...initialValidationErrors, ...finalValidationErrors };
        setValidationErrors(errorObject);
      }
    },
  });

  function retry() {
    setRetryCount((prevCount) => prevCount + 1);
    reset();
    setUserName('');
    setPassword('');
    setConfirmPassword('');
    setValidationErrors(initialValidationErrors);
  }

  const passwordOptions = {
    name: 'password',
    id: 'password',
    placeholder: 'Password',
    value: password,
    setter: setPassword,
    error: validationErrors.password,
  };

  const confirmPasswordOptions = {
    name: 'password_confirmation',
    id: 'confirm-password',
    placeholder: 'Confirm Password',
    value: confirmPassword,
    setter: setConfirmPassword,
    error: validationErrors.confirmPassword,
  };

  if (isError && retryCount < 3) return <RetryButton error={error.message} retry={retry} />;
  else if (isError) return <Error error={error} />;

  return (
    <div className='flex justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        <h2 className='mb-2 text-center text-3xl font-bold'>Sign up</h2>
        <p className='p-4 text-center'>To leave comments with your desired username</p>
        <div className='bg-tea_green-700 mt-12 space-y-8 rounded-md p-8'>
          <form
            className='space-y-8'
            onSubmit={(e) => {
              e.preventDefault();
              mutate();
            }}
          >
            <UserNameInput userName={userName} setUserName={setUserName} error={validationErrors.userName} />
            <PasswordInput options={passwordOptions} />
            <PasswordInput options={confirmPasswordOptions} />
            <button
              className='bg-papaya_whip-400 hover:bg-papaya_whip-300 flex w-full justify-center gap-4 rounded-md p-2 font-bold hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
              type='submit'
              disabled={isPending}
            >
              <p>Sign Up</p>
              {isPending && <LoadingIcon className='animate-spin' />}
            </button>
          </form>
          <p className='text-center'>
            Already have an account?
            <Link to='/login'>
              <span className='font-bold'> Log in</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
