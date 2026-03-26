import useFetch from '../../../hooks/useFetch';

function DeleteTagDialog({ currentUser, tagFetch, onDialogClose, selectedTag }) {
  const { error, loading, data, retry, triggerFetch } = useFetch('/admin/tags', { fetch: false });

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
    await triggerFetch({ options });
    await tagFetch();
    console.log(error);
    if (!error) onDialogClose();
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
        >
          Confirm
        </button>
        <button className='rounded-md bg-red-400 p-2 hover:cursor-pointer hover:bg-red-500' onClick={onDialogClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteTagDialog;
