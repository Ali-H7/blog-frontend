import { Trash2 as DeleteIcon } from 'lucide-react';
import Dialog from './Dialog';
import DialogWithConfirmBtn from './DialogWithConfirmBtn';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '../../helpers/fetchData';

// TODO: handle comment deletion

function DeleteContent({ contentId, route, user }) {
  const queryClient = useQueryClient();

  const keyword = route === '/admin/comments' ? 'comment' : 'post';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const onClose = () => setIsDialogOpen(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ signal }) => {
      const options = {
        signal,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          id: contentId,
        }),
      };
      return fetchData(route, options);
    },

    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const dialogOptions = {
    onClose,
    isPending,
    error,
    mutate,
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
        disableEscKey={isPending}
      >
        <DialogWithConfirmBtn options={dialogOptions} />
      </Dialog>
    </div>
  );
}

export default DeleteContent;
