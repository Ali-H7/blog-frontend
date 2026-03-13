import { Link, useNavigate, useRouteError } from 'react-router';
import { useState, useEffect } from 'react';
import Layout from './Layout';

function Error() {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();
  const error = useRouteError();
  const message = error.status === 404 ? '404 Error - Page not found.' : 'Something went wrong';

  useEffect(() => {
    if (count <= 0) {
      navigate('/', { replace: true });
      return;
    }
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <Layout>
      <div className='p-4'>
        <div className='bg-papaya_whip-400 mt-12 space-y-2 rounded-md p-4 text-center'>
          <h2>{message}</h2>
          <p>You will be redirected to the homepage in {count} seconds.</p>
          <Link to='/'>
            <p className='font-bold'>Go to the homepage now</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
export default Error;
