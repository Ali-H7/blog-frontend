import { Trash2 as DeleteIcon } from 'lucide-react';
import Dialog from './Dialog';
import DialogWithConfirmBtn from './DialogWithConfirmBtn';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

function DeleteContent({ contentId, route, user, onSuccess }) {
  const keyword = route === '/admin/comments' ? 'comment' : 'post';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const onClose = () => {
    setError(null);
    setIsDialogOpen(false);
  };

  const { loading, error, setError, triggerFetch } = useFetch(route, { fetch: false });

  async function handleConfirm() {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        id: contentId,
      }),
    };

    try {
      setError(null);
      await triggerFetch({ options });
      onSuccess();
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
    textContent: `Deleting this ${keyword} is permanent. Once deleted, it cannot be recovered. Continue?`,
  };

  return (
    <div>
      <button className='hover:cursor-pointer hover:text-red-500' onClick={openDialog}>
        <DeleteIcon />
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

export default DeleteContent;
