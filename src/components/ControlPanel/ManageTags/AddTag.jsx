import { useState } from 'react';
import { Plus as AddIcon } from 'lucide-react';

function AddTag({ currentUser, addFetch, tagFetch }) {
  const [tag, setTag] = useState('');
  const { error, loading, data, retry, triggerFetch } = addFetch;
  console.log(error);
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
    await triggerFetch({ options });
    await tagFetch();
    setTag('');
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
          disabled={false}
          required
        />
        <button
          className='bg-papaya_whip-400 hover:bg-papaya_whip-300 flex items-center justify-center gap-2 rounded-md p-2 hover:cursor-pointer'
          onClick={add}
        >
          <p>Add</p>
          <AddIcon />
        </button>
      </div>
    </div>
  );
}
export default AddTag;
