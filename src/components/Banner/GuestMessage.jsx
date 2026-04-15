import { Link } from 'react-router';

function GuestMessage() {
  return (
    <p className='text-center'>
      Welcome! Feel free to explore. To join the discussion, please
      <Link to='/login'>
        <span className='font-bold'> Login </span>
      </Link>
      or
      <Link to='/signup'>
        <span className='font-bold'> Sign Up</span>
      </Link>
      .
    </p>
  );
}

export default GuestMessage;
