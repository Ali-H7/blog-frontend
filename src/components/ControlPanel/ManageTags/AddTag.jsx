import { useState } from 'react';
import { Plus as AddIcon, LoaderCircle as LoadingIcon } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import fetchData from '../../../helpers/fetchData';

function AddTag({ headers, route, isTagsPending, isTagsFetching, setAlertMsg }) {
  const queryClient = useQueryClient();
  const [tag, setTag] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const options = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name: tag,
        }),
      };
      return fetchData(route, options);
    },

    onSuccess: () => {
      setTag('');
      queryClient.invalidateQueries({ queryKey: ['tags', 'manage'] });
    },
    onError: (err) => {
      const { validationErrors } = err;
      if (validationErrors?.length > 0) setAlertMsg(validationErrors[0].msg);
      else setAlertMsg(err.message);
    },
  });

  return (
    <div className='space-y-4'>
      <h1 className='text-center text-2xl font-bold'>Manage Tags</h1>
      <div className='mb-8 flex gap-4'>
        <input
          className='bg-tea_green-DEFAULT w-full rounded-md border p-2 focus:border-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
          type='text'
          name='Tag'
          id='Tag'
          placeholder='Tag Name'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          disabled={isPending || isTagsPending || isTagsFetching}
          required
        />
        <button
          className='bg-papaya_whip-400 hover:bg-papaya_whip-300 flex items-center justify-center gap-2 rounded-md p-2 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
          onClick={mutate}
          disabled={isPending || isTagsPending || isTagsFetching}
        >
          {isPending ? (
            <LoadingIcon className='animate-spin' />
          ) : (
            <>
              <p>Add</p>
              <AddIcon />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
export default AddTag;
