import UserNameInput from './UserNameInput';
import { Navigate, useNavigate } from 'react-router';
import getLoggedUser from '../../helpers/getLoggedUser';
import { useState } from 'react';
import PasswordInput from './PasswordInput';
import useFetch from '../../hooks/useFetch';
import { LoaderCircle as LoadingIcon } from 'lucide-react';
import RetryButton from '../shared/RetryButton';
import { Link } from 'react-router';

function SignUp() {
  const currentUser = getLoggedUser();
  if (currentUser) return <Navigate to='/' replace />;

  const initialValidationErrors = {
    userName: '',
    password: '',
    confirmPassword: '',
  };

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { loading, setLoading, error, setError, triggerFetch } = useFetch('/signup', { fetch: false });
  const [validationErrors, setValidationErrors] = useState(initialValidationErrors);
  const navigate = useNavigate();

  function retry() {
    setLoading(false);
    setError(null);
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

  async function handleOnSubmit() {
    setValidationErrors(initialValidationErrors);
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

    try {
      await triggerFetch({ options });
      navigate('/login', { replace: true });
    } catch (err) {
      const { validationErrors } = err;
      if (validationErrors && validationErrors.length > 0) {
        setError(null);
        const mappedErrors = validationErrors.map((validationErr) => ({ [validationErr.path]: validationErr.msg }));
        const finalValidationErrors = Object.assign(...mappedErrors);
        const errorObject = { ...initialValidationErrors, ...finalValidationErrors };
        setValidationErrors(errorObject);
      }
      console.error(err);
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
        <h2 className='mb-2 text-center text-3xl font-bold'>Sign up</h2>
        <p className='p-4 text-center'>To leave comments with your desired username</p>
        <div className='bg-tea_green-700 mt-12 space-y-8 rounded-md p-8'>
          <form
            className='space-y-8'
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <UserNameInput userName={userName} setUserName={setUserName} error={validationErrors.userName} />
            <PasswordInput options={passwordOptions} />
            <PasswordInput options={confirmPasswordOptions} />
            <button
              className='bg-papaya_whip-400 hover:bg-papaya_whip-300 flex w-full justify-center gap-4 rounded-md p-2 font-bold hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
              type='submit'
              disabled={loading}
            >
              <p>Sign Up</p>
              {loading && <LoadingIcon className='animate-spin' />}
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
