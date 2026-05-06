import { useAuth } from '../../context/AuthContext';
import { useParams, Navigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import PostEditor from './PostEditor';
import PostEditorLoading from './PostEditorLoading';
import Error from '../Error';
import RetryButton from '../shared/RetryButton';
import fetchData from '../../helpers/fetchData';

function EditPost() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  if (!user) return <Navigate to='/login' replace />;
  else if (user && !isAdmin) return <Navigate to='/' replace />;

  const { slug } = useParams();
  const [retryCount, setRetryCount] = useState(0);
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['post', slug],
    queryFn: ({ signal }) => {
      const options = {
        signal,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };
      return fetchData(`/posts/${slug}`, options);
    },
  });

  function retry() {
    setRetryCount((prevCount) => prevCount + 1);
    refetch();
  }

  if (isError && retryCount < 3) return <RetryButton error={error.message} retry={retry} />;
  else if (isError) return <Error error={error} />;

  if (isLoading) return <PostEditorLoading />;

  const { id, formattedText, rawText, title, published, tags } = data.post;
  const editorOpitons = {
    method: 'PUT',
    id,
    formattedText,
    rawText,
    title,
    published,
    selectedTags: tags?.map((tag) => ({ value: tag.id, label: tag.name })),
  };
  return <PostEditor customOptions={editorOpitons} />;
}
export default EditPost;
