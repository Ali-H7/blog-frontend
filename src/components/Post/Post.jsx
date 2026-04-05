import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import DOMPurify from 'dompurify';
import PostDetails from './PostDetails';
import PostComment from './PostComment';
import CommentList from './CommentList';
import PostLoading from './PostLoading';
import RetryButton from '../shared/RetryButton';

function Post() {
  const { slug } = useParams();
  const { error, loading, data, setData, retry } = useFetch(`/posts/${slug}`);
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

  function updateComments(data) {
    const { comment } = data;
    setData((prevData) => {
      const { post } = prevData;
      const updatedPost = { ...post, comments: [comment, ...post.comments] };
      return { post: updatedPost };
    });
  }

  return (
    <div className='space-y-8 p-4 pt-8'>
      <PostDetails {...postDetailsProps} />
      <div dangerouslySetInnerHTML={sanitizedContent} />
      <PostComment postId={post.id} updateComments={updateComments} />
      <CommentList comments={comments} />
    </div>
  );
}
export default Post;
