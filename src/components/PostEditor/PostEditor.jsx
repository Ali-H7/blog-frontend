import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { Editor } from '@tinymce/tinymce-react';
import Switch from 'react-switch';
import { LoaderCircle as LoadingIcon } from 'lucide-react';
import RetryButton from '../shared/RetryButton';
import Alert from '../shared/Alert';
import Select from 'react-select';
import Skeleton from 'react-loading-skeleton';
import transformTagsForSelection from '../../helpers/transformTagsForSelection';
import { useAuth } from '../../context/AuthContext';

const KNOWN_ERRORS = {
  401: "You don't have permission to create a post",
  409: 'A post with this title already exists. Kindly choose a different name.',
};

function PostEditor({ customOptions = {} }) {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  if (!user) return <Navigate to='/login' replace />;
  else if (user && !isAdmin) return <Navigate to='/' replace />;

  const defaultOptions = {
    method: 'POST',
    title: '',
    rawText: 'Type post content here!',
    formattedText: `<div>Type post content here!</div>`,
    published: false,
    selectedTags: [],
  };
  const editorOpitons = { ...defaultOptions, ...customOptions };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`,
  };

  const API = import.meta.env.VITE_TINYMCE_API;
  const [postTitle, setPostTitle] = useState(editorOpitons.title);
  const [postContent, setPostContent] = useState({
    rawText: editorOpitons.rawText,
    formattedText: editorOpitons.formattedText,
  });
  const [published, setPublished] = useState(editorOpitons.published);
  const [selectedOption, setSelectedOption] = useState(editorOpitons.selectedTags);
  const [alert, setAlert] = useState(null);
  const { error, setError, loading, setRetryCount, triggerFetch } = useFetch('/admin/posts', { fetch: false });
  const tagsFetch = useFetch('/admin/tags', { options: { headers }, fetch: true });
  const navigate = useNavigate();
  const options = transformTagsForSelection(tagsFetch.data);
  function reload() {
    setError(null);
    setRetryCount((prev) => prev + 1);
  }

  async function handlePostSubmission() {
    const options = {
      method: editorOpitons.method,
      headers,
      body: JSON.stringify({
        ...(editorOpitons.method === 'PUT' && { id: editorOpitons.id }),
        title: postTitle,
        rawText: postContent.rawText,
        formattedText: postContent.formattedText,
        published,
        tags: selectedOption.map((tag) => ({
          id: tag.value,
        })),
        userId: user.id,
      }),
    };

    try {
      const response = await triggerFetch({ options });
      const { post } = response;
      navigate(`/posts/${post.slug}`, { replace: true });
    } catch (err) {
      const statusCode = err.status;
      const isErrorKnown = Object.hasOwn(KNOWN_ERRORS, statusCode);
      if (isErrorKnown) {
        setAlert(KNOWN_ERRORS[statusCode]);
        setError(null);
      }
    }
  }

  if (error && !alert) {
    const errorProps = { error, retry: reload };
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
          handlePostSubmission();
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
          disabled={loading}
          required
        />
        <Editor
          apiKey={API}
          onEditorChange={(content, editor) => {
            setPostContent({
              rawText: editor.getContent({ format: 'text' }),
              formattedText: content,
            });
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
          initialValue={editorOpitons.formattedText}
          readonly={loading}
        />
        {tagsFetch.loading ? (
          <Skeleton height={'38px'} />
        ) : (
          <Select
            isMulti
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder={'Select Tags'}
            noOptionsMessage={() => 'No tags available, you can add using the manage tags page'}
          />
        )}
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
            disabled={loading}
          />
          <p className='font-bold'>Publish</p>
        </div>
        <button
          className='bg-tea_green-500 hover:bg-tea_green-400 flex w-full justify-center gap-2 self-end rounded-md p-2 font-bold hover:cursor-pointer'
          type='submit'
          disabled={loading}
        >
          <p>{editorOpitons.method === 'POST' ? 'Create' : 'Edit'} Post</p>
          {loading && <LoadingIcon className='animate-spin' />}
        </button>
      </form>
      {alert && <Alert dialogStatus={alert} onClose={() => setAlert(null)} />}
    </div>
  );
}

export default PostEditor;
