import Dialog from '../shared/Dialog';
import { useState } from 'react';
import { X as CloseIcon, LoaderCircle as LoadingIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';

function MemberMessage({ user }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const onClose = () => setIsDialogOpen(false);

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const { triggerFetch, loading, error } = useFetch('/admin/request-role', { options, fetch: false });

  async function handleConfirm() {
    try {
      const userData = await triggerFetch();
      login(userData);
      navigate(0);
    } catch (err) {
      // handled in the UI
    }
  }

  return (
    <div>
      <p className='text-center'>
        Welcome, <span className='font-bold'>{user.userName}</span> You currently have Member only access.
        <span className='font-bold'>
          {' '}
          <button className='hover:cursor-pointer hover:underline' onClick={openDialog}>
            Request admin privileges.
          </button>
        </span>
      </p>
      {isDialogOpen && (
        <Dialog
          position={'top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'}
          dialogStatus={isDialogOpen}
          onClose={onClose}
          disableEscKey={loading}
        >
          <div className='bg-papaya_whip-400 relative flex max-w-xl items-center gap-4 rounded-md p-4'>
            <CloseIcon
              className='absolute top-2 right-4 hover:cursor-pointer disabled:hover:cursor-not-allowed'
              onClick={onClose}
              disabled={loading}
            />
            <div className='space-y-2'>
              <h1 className='text-center font-bold'>Please Read!</h1>
              {error && <p className='text-center text-red-600'>Something went wrong, please try again later!</p>}
              <p className='mb-4'>
                This access is for testing purposes only. Please do not delete, edit, or post inappropriate content.
                Help us keep the environment clean and functional for everyone.
              </p>
              <button
                className='bg-tea_green-300 hover:bg-tea_green-200 flex w-full justify-center gap-4 p-2 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
                onClick={handleConfirm}
                disabled={loading}
              >
                <p>Confirm</p>
                {loading && <LoadingIcon className='animate-spin' />}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default MemberMessage;
