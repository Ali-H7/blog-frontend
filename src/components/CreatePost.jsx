import { Editor } from '@tinymce/tinymce-react';
import { useState, useEffect, useRef } from 'react';
import Switch from 'react-switch';
import getLoggedUser from '../helpers/getLoggedUser';
import fetchData from '../helpers/fetchData';
import { LoaderCircle as LoadingIcon, CircleX as ErrorIcon, X as CloseIcon } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router';
import RetryButton from './shared/RetryButton';

function CreatePost() {
  const currentUser = getLoggedUser();
  if (!currentUser) {
    return <Navigate to='/cp/login' replace />;
  }

  const API = import.meta.env.VITE_TINYMCE_API;
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('Type post content here!');
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();
  const dialogRef = useRef(null);

  const knownErrors = {
    401: "You don't have permission to create a post",
    409: 'A post with this title already exists. Kindly choose a different name.',
  };

  useEffect(() => {
    if (attemptCount > 3) throw new Error('Something went wrong');
  }, [attemptCount]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!alert) {
      dialog.close();
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }, [alert]);

  function retry() {
    setError(null);
  }

  async function handlePostCreation() {
    setAttemptCount((prev) => prev + 1);
    setIsLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
        published,
        userId: currentUser.id,
      }),
      signal,
    };

    try {
      const data = await fetchData('/posts', options);
      const { post } = data;
      navigate(`/posts/${post.slug}`, { replace: true });
    } catch (err) {
      const statusCode = err.status;
      const isErrorKnown = Object.hasOwn(knownErrors, statusCode);
      if (isErrorKnown) {
        setAlert(knownErrors[statusCode]);
      } else {
        setError(err.message);
      }
    } finally {
      if (!signal.aborted) {
        setIsLoading(false);
      }
    }
  }

  if (error) {
    const errorProps = { error, retry };
    return (
      <div className='p-8'>
        <RetryButton {...errorProps} />
      </div>
    );
  }

  return (
    <div className='p-8'>
      <form
        className='flex flex-col gap-8'
        onSubmit={(e) => {
          e.preventDefault();
          handlePostCreation();
        }}
      >
        <input
          className='bg-tea_green-DEFAULT rounded-md border p-2 focus:border-2'
          type='text'
          name='title'
          id='title'
          placeholder='Post Title'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          disabled={isLoading}
          required
        />
        <Editor
          apiKey={API}
          onEditorChange={(newValue, _) => {
            setPostContent(newValue);
          }}
          init={{
            plugins: [
              // Core editing features
              'anchor',
              'autolink',
              'charmap',
              'codesample',
              'emoticons',
              'link',
              'lists',
              'media',
              'searchreplace',
              'table',
              'visualblocks',
              'wordcount',
            ],
            toolbar:
              'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          }}
          value={postContent}
          readonly={isLoading}
        />
        <div className='flex items-center gap-2 self-end'>
          <Switch
            checked={published}
            onChange={() => setPublished((status) => !status)}
            onColor='#ccd5ae'
            onHandleColor='#acbb7b'
            handleDiameter={24}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
            activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
            height={16}
            width={40}
            className='react-switch'
            id='material-switch'
            disabled={isLoading}
          />
          <p className='font-bold'>Publish</p>
        </div>
        <button
          className='bg-tea_green-500 hover:bg-tea_green-400 flex w-full justify-center gap-2 self-end rounded-md p-2 font-bold hover:cursor-pointer'
          type='submit'
          disabled={isLoading}
        >
          <p>Create Post</p>
          {isLoading && <LoadingIcon className='animate-spin' />}
        </button>
      </form>
      <dialog
        className='fixed top-1/8 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop:bg-black/65'
        ref={dialogRef}
      >
        <div className='bg-papaya_whip-400 flex min-w-75 items-center gap-4 rounded-md p-4'>
          <CloseIcon className='absolute top-2 right-4 hover:cursor-pointer' onClick={() => setAlert(false)} />
          <ErrorIcon className='shrink-0' size={48} />
          <div>
            <h1 className='font-bold'>Error!</h1>
            <p>{alert}</p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
export default CreatePost;
