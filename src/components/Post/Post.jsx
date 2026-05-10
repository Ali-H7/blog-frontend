import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../../helpers/fetchData';
import DOMPurify from 'dompurify';
import PostDetails from './PostDetails';
import CommentList from './CommentList';
import PostLoading from './PostLoading';
import RetryButton from '../shared/RetryButton';
import { useAuth } from '../../context/AuthContext';

function Post() {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  const { slug } = useParams();

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ['post', slug],
    queryFn: ({ signal }) => {
      const options = {
        signal,
        ...(isAdmin && {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }),
      };
      return fetchData(`/posts/${slug}`, options);
    },
  });

  if (isLoading) return <PostLoading />;
  if (isError) return <RetryButton error={error.message} retry={refetch} />;

  const { post } = data;
  const {
    rawText,
    dateCreated,
    title,
    tags,
    comments,
    user: { userName },
  } = post;

  const postDetailsProps = { rawText, dateCreated, title, tags, userName };
  const sanitizedContent = { __html: DOMPurify.sanitize(post.formattedText) };

  return (
    <div className='space-y-8 p-4 pt-8'>
      <PostDetails {...postDetailsProps} />
      <div className='border-tea_green-400 border-t-2 border-b-2 py-4' dangerouslySetInnerHTML={sanitizedContent} />
      <CommentList comments={comments} postId={post.id} />
    </div>
  );
}
export default Post;
