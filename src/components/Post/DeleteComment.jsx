import Dialog from '../shared/Dialog';
import DialogWithConfirmBtn from '../shared/DialogWithConfirmBtn';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

function DeleteComment({ commentId, updateComments, user }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const onClose = () => {
    setError(null);
    setIsDialogOpen(false);
  };

  const { loading, error, setError, triggerFetch } = useFetch('/admin/comments', { fetch: false });

  async function handleConfirm() {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        id: commentId,
      }),
    };

    try {
      setError(null);
      await triggerFetch({ options });
      updateComments({ data: commentId, operation: 'DELETE' });
      onClose();
    } catch (err) {
      setError('Something went wrong... Try Again');
    }
  }

  const dialogOptions = {
    onClose,
    loading,
    error,
    handleConfirm,
    title: 'Warning!',
    textContent: `Deleting this comment is permanent. Once deleted, it cannot be recovered. Continue?`,
  };

  return (
    <div>
      <button className='hover:cursor-pointer hover:text-red-500 hover:underline' onClick={openDialog}>
        Delete
      </button>
      <Dialog
        position='top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2'
        dialogStatus={isDialogOpen}
        onClose={onClose}
        disableEscKey={loading}
      >
        <DialogWithConfirmBtn options={dialogOptions} />
      </Dialog>
    </div>
  );
}
export default DeleteComment;
