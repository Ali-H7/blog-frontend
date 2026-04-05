import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import getLoggedUser from '../../helpers/getLoggedUser';
import { LoaderCircle as LoadingIcon } from 'lucide-react';
import Alert from '../shared/Alert';

function PostComment({ postId, updateComments }) {
  const { loading, setError, triggerFetch } = useFetch('/comments', { fetch: false });
  const [comment, setComment] = useState('');
  const characterCount = `${comment.length} / 160 ${comment.length > 160 ? '!' : ''}`;
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getLoggedUser();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(user && { Authorization: `Bearer ${user.token}` }),
      },
      body: JSON.stringify({
        postId,
        content: comment,
      }),
    };

    try {
      const userComment = await triggerFetch({ options });
      setComment('');
      updateComments(userComment);
    } catch (err) {
      setError(null);
      setAlert('Something went wrong... Try Again');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          className='bg-tea_green-DEFAULT relative mb-4 min-h-32 w-full rounded-md border p-2 focus:border-2'
          type='text'
          name='comment'
          id='comment'
          placeholder='Add a comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={loading}
          required
        />
        <div className='flex justify-between'>
          <p className={comment.length > 160 ? 'text-red-500' : undefined}>{characterCount}</p>
          <button className='bg-tea_green-500 flex gap-4 rounded-md p-2 font-bold' type='submit' disabled={loading}>
            <p>Post Comment</p>
            {loading && <LoadingIcon className='animate-spin' />}
          </button>
        </div>
      </form>
      {alert && <Alert dialogStatus={alert} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default PostComment;
