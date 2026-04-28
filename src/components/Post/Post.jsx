import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import DOMPurify from 'dompurify';
import PostDetails from './PostDetails';
import CommentList from './CommentList';
import PostLoading from './PostLoading';
import RetryButton from '../shared/RetryButton';
import { useAuth } from '../../context/AuthContext';

function Post() {
  const { user: loggedUser } = useAuth();
  const isAdmin = loggedUser?.isAdmin;
  const options = {};
  if (isAdmin) {
    options.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loggedUser.token}`,
    };
  }
  const { slug } = useParams();
  const { error, loading, data, setData, retry } = useFetch(`/posts/${slug}`, { options });
  const containerClasses = 'space-y-8 pb-4 pt-8 px-4';
  const errorProps = { error, retry };

  if (loading) return <PostLoading containerClasses={containerClasses} />;

  if (error)
    return (
      <div className={containerClasses}>
        <RetryButton {...errorProps} />
      </div>
    );

  const { post } = data;
  const { rawText, dateCreated, title, tags, comments, user } = post;
  const postDetailsProps = { rawText, dateCreated, title, tags, userName: user.userName };
  const sanitizedContent = { __html: DOMPurify.sanitize(post.formattedText) };

  function updateComments({ data, operation }) {
    if (operation === 'ADD') {
      const { comment } = data;
      setData((prevData) => {
        const { post } = prevData;
        const updatedPost = { ...post, comments: [comment, ...post.comments] };
        return { post: updatedPost };
      });
    } else if (operation === 'DELETE') {
      const commentId = data;
      setData((prevData) => {
        const { post } = prevData;
        const updatedPost = { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) };
        return { post: updatedPost };
      });
    }
  }

  return (
    <div className='space-y-8 p-4 pt-8'>
      <PostDetails {...postDetailsProps} />
      <div className='border-tea_green-400 border-t-2 border-b-2 py-4' dangerouslySetInnerHTML={sanitizedContent} />
      <CommentList comments={comments} postId={post.id} updateComments={updateComments} />
    </div>
  );
}
export default Post;
