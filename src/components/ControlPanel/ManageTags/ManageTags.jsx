import { useState } from 'react';
import Dialog from '../../shared/Dialog';
import DeleteTagDialog from './DeleteTagDialog';
import AddTag from './AddTag';
import TagList from './TagList';
import Alert from '../../shared/Alert';
import RetryButton from '../../shared/RetryButton';
import { useAuth } from '../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../../../helpers/fetchData';
import Error from '../../Error';

function ManageTags() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  if (!user) return <Navigate to='/login' replace />;
  else if (user && !isAdmin) return <Navigate to='/' replace />;

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` };
  const route = '/admin/tags';

  const [retryCount, setRetryCount] = useState(0);
  const { data, isError, isPending, isFetching, error, refetch } = useQuery({
    queryKey: ['tags', 'manage'],
    queryFn: ({ signal }) => {
      return fetchData(`/admin/tags`, { signal, headers });
    },
  });

  function retry() {
    setRetryCount((prevCount) => prevCount + 1);
    refetch();
  }

  const [alertMsg, setAlertMsg] = useState('');
  const [selectedTag, setSelectedTag] = useState({ id: '', name: '' });

  if (isError && retryCount < 3) return <RetryButton error={error.message} retry={retry} />;
  else if (isError) return <Error error={error} />;

  return (
    <div className='space-y-4 p-8'>
      <AddTag
        headers={headers}
        route={route}
        isTagsPending={isPending}
        isTagsFetching={isFetching}
        setAlertMsg={setAlertMsg}
      />
      {!isError ? (
        <TagList data={data} loading={isPending} isTagsFetching={isFetching} setSelectedTag={setSelectedTag} />
      ) : (
        <RetryButton error={error.message} retry={retry} />
      )}
      <DeleteTagDialog
        headers={headers}
        route={route}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        setAlertMsg={setAlertMsg}
      />
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
export default ManageTags;
