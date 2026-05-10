import { Trash2 as DeleteIcon } from 'lucide-react';
import Dialog from './Dialog';
import DialogWithConfirmBtn from './DialogWithConfirmBtn';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import fetchData from '../../helpers/fetchData';

function DeleteContent({ contentId, routeInfo, user }) {
  const queryClient = useQueryClient();
  const { slug } = useParams();
  const { route, keyword } = routeInfo;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

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
      closeDialog();
      switch (keyword) {
        case 'post':
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          break;
        case 'comments':
          queryClient.invalidateQueries({ queryKey: ['post', slug] });
          break;
      }
    },
  });

  const dialogOptions = {
    onClose: closeDialog,
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
        onClose={closeDialog}
        disableEscKey={isPending}
      >
        <DialogWithConfirmBtn options={dialogOptions} />
      </Dialog>
    </div>
  );
}

export default DeleteContent;
