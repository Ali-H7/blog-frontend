import Dialog from '../shared/Dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import DialogWithConfirmBtn from '../shared/DialogWithConfirmBtn';

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

  const dialogOptions = {
    onClose,
    loading,
    error,
    handleConfirm,
    title: 'Please Read!',
    textContent: `This access is for testing purposes only. Please do not delete, edit, or post inappropriate content.
                Help us keep the environment clean and functional for everyone.`,
  };

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
          <DialogWithConfirmBtn options={dialogOptions} />
        </Dialog>
      )}
    </div>
  );
}

export default MemberMessage;
