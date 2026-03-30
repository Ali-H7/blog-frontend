import { LoaderCircle as LoadingIcon } from 'lucide-react';

function DeleteTagDialog({ currentUser, deleteFetch, setData, onDialogClose, selectedTag }) {
  const { loading, triggerFetch } = deleteFetch;

  async function deleteTag() {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        id: selectedTag.id,
      }),
    };

    try {
      await triggerFetch({ options });
      setData((tagObj) => {
        const tags = tagObj.tags.filter((tag) => tag.id !== selectedTag.id);
        return { tags };
      });
    } catch (err) {
      console.error(err);
    } finally {
      onDialogClose();
    }
  }

  return (
    <div className='bg-papaya_whip-400 w-full max-w-3xl space-y-4 rounded-md p-4'>
      <p className='text-center'>
        You are going to delete Tag <span className='font-bold'>[{selectedTag.name}]</span>
      </p>
      <div className='flex justify-center gap-4 font-bold'>
        <button
          className='bg-tea_green-300 hover:bg-tea_green-200 rounded-md p-2 hover:cursor-pointer'
          onClick={deleteTag}
          disabled={loading}
        >
          {loading ? <LoadingIcon className='animate-spin' /> : <p>Confirm</p>}
        </button>
        <button
          className='rounded-md bg-red-400 p-2 hover:cursor-pointer hover:bg-red-500'
          onClick={onDialogClose}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteTagDialog;
