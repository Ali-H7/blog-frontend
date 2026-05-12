import { LoaderCircle as LoadingIcon } from 'lucide-react';
import Dialog from '../../shared/Dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '../../../helpers/fetchData';

function DeleteTagDialog({ headers, route, selectedTag, setSelectedTag, setAlertMsg }) {
  const queryClient = useQueryClient();

  const isDialogOpen = selectedTag.id;
  const onDialogClose = () => setSelectedTag({ id: '', name: '' });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ signal }) => {
      const options = {
        signal,
        method: 'DELETE',
        headers,
        body: JSON.stringify({
          id: selectedTag.id,
        }),
      };
      return fetchData(route, options);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags', 'manage'] });
      onDialogClose();
    },
    onError: (err) => {
      onDialogClose();
      setAlertMsg(err.message);
    },
  });

  return (
    <Dialog
      position='top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'
      dialogStatus={isDialogOpen}
      disableEscKey={isPending}
      onClose={onDialogClose}
    >
      <div className='bg-papaya_whip-400 w-full max-w-3xl space-y-4 rounded-md p-4'>
        <p className='text-center'>
          You are going to delete Tag <span className='font-bold'>[{selectedTag.name}]</span>
        </p>
        <div className='flex justify-center gap-4 font-bold'>
          <button
            className='bg-tea_green-300 hover:bg-tea_green-200 rounded-md p-2 hover:cursor-pointer'
            onClick={mutate}
            disabled={isPending}
          >
            {isPending ? <LoadingIcon className='animate-spin' /> : <p>Confirm</p>}
          </button>
          <button
            className='rounded-md bg-red-400 p-2 hover:cursor-pointer hover:bg-red-500'
            onClick={onDialogClose}
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default DeleteTagDialog;
