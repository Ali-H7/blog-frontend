import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Dialog from '../../shared/Dialog';
import DeleteTagDialog from './DeleteTagDialog';
import { X as XIcon } from 'lucide-react';
import AddTag from './AddTag';
import getLoggedUser from '../../../helpers/getLoggedUser';

function ManageTags() {
  const currentUser = getLoggedUser();
  if (!currentUser) {
    return <Navigate to='/cp/login' replace />;
  }

  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${currentUser.token}`,
    },
  };

  const { error, loading, data, retry, triggerFetch } = useFetch('/admin/tags', { options, fetch: true });
  const addFetch = useFetch('/admin/tags', { fetch: false });

  const [selectedTag, setSelectedTag] = useState({ id: '', name: '' });

  const isDialogOpen = selectedTag.id;
  const onDialogClose = () => setSelectedTag({ id: '', name: '' });

  return (
    <div className='space-y-4 p-8'>
      <AddTag currentUser={currentUser} addFetch={addFetch} tagFetch={triggerFetch} />
      <div className='space-y-4'>
        <h1 className='text-center text-2xl font-bold'>Tag List</h1>
        <div className='bg-tea_green-DEFAULT flex flex-wrap justify-center gap-4 rounded-md p-4'>
          {data?.tags.map((tag) => (
            <div
              key={tag.id}
              className='bg-beige-DEFAULT flex max-w-fit items-center justify-between gap-2 rounded-md p-2'
            >
              <p>{tag.name}</p>
              <button
                className='h-fit w-fit hover:cursor-pointer hover:text-red-500'
                onClick={() => setSelectedTag({ id: tag.id, name: tag.name })}
              >
                <XIcon />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        position='top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'
        dialogStatus={isDialogOpen}
        onClose={onDialogClose}
      >
        <DeleteTagDialog
          currentUser={currentUser}
          tagFetch={triggerFetch}
          onDialogClose={onDialogClose}
          selectedTag={selectedTag}
        />
      </Dialog>
    </div>
  );
}
export default ManageTags;
