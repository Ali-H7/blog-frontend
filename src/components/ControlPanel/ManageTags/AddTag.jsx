import { useState } from 'react';
import { Plus as AddIcon, LoaderCircle as LoadingIcon } from 'lucide-react';
import Alert from '../../shared/Alert';

function AddTag({ currentUser, addFetch, setData, tagsFetchLoading }) {
  const [tag, setTag] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const { loading, triggerFetch } = addFetch;

  async function add() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        name: tag,
      }),
    };

    try {
      const response = await triggerFetch({ options });
      setData((tagObj) => ({
        ...tagObj,
        tags: [response.tag, ...tagObj.tags],
      }));
      setTag('');
    } catch (err) {
      const { validationErrors } = err;
      if (validationErrors?.length > 0) setAlertMsg(validationErrors[0].msg);
      else setAlertMsg(err.message);
    }
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-center text-2xl font-bold'>Manage Tags</h1>
      <div className='mb-8 flex gap-4'>
        <input
          className='bg-tea_green-DEFAULT w-full rounded-md border p-2 focus:border-2'
          type='text'
          name='Tag'
          id='Tag'
          placeholder='Tag Name'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          disabled={loading || tagsFetchLoading}
          required
        />
        <button
          className='bg-papaya_whip-400 hover:bg-papaya_whip-300 flex items-center justify-center gap-2 rounded-md p-2 hover:cursor-pointer'
          onClick={add}
          disabled={loading || tagsFetchLoading}
        >
          {loading ? (
            <LoadingIcon className='animate-spin' />
          ) : (
            <>
              <p>Add</p>
              <AddIcon />
            </>
          )}
        </button>
      </div>
      {alertMsg && (
        <Alert
          position={'top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2'}
          dialogStatus={alertMsg}
          onClose={() => setAlertMsg('')}
        />
      )}
    </div>
  );
}
export default AddTag;
