import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Dialog from '../../shared/Dialog';
import DeleteTagDialog from './DeleteTagDialog';
import AddTag from './AddTag';
import TagList from './TagList';
import getLoggedUser from '../../../helpers/getLoggedUser';
import Alert from '../../shared/Alert';
import RetryButton from '../../shared/RetryButton';

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

  const { error, loading, data, setData, retry } = useFetch('/admin/tags', { options, fetch: true });
  const addFetch = useFetch('/admin/tags', { fetch: false });
  const deleteFetch = useFetch('/admin/tags', { fetch: false });

  const [selectedTag, setSelectedTag] = useState({ id: '', name: '' });

  const isDialogOpen = selectedTag.id;
  const onDialogClose = () => setSelectedTag({ id: '', name: '' });

  return (
    <div className='space-y-4 p-8'>
      <AddTag currentUser={currentUser} addFetch={addFetch} setData={setData} tagsFetchLoading={loading} />
      {!error ? (
        <TagList data={data} loading={loading} setSelectedTag={setSelectedTag} />
      ) : (
        <RetryButton error={error} retry={retry} />
      )}
      <Dialog
        position='top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'
        dialogStatus={isDialogOpen}
        disableEscKey={deleteFetch.loading}
        onClose={onDialogClose}
      >
        <DeleteTagDialog
          currentUser={currentUser}
          deleteFetch={deleteFetch}
          setData={setData}
          onDialogClose={onDialogClose}
          selectedTag={selectedTag}
        />
      </Dialog>
      {deleteFetch.error && (
        <Alert
          position={'top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2'}
          dialogStatus={deleteFetch.error}
          onClose={() => deleteFetch.setError(null)}
        />
      )}
    </div>
  );
}
export default ManageTags;
