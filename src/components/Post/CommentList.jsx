import TimeAgo from 'timeago-react';
import UserAvatar from './UserAvatar';
import PostComment from './PostComment';
import DeleteContent from '../shared/DeleteContent';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { Link } from 'react-router';

function CommentList({ postId, comments }) {
  const { user } = useAuth();
  const isAdmin = user && user.isAdmin;
  const [comment, setComment] = useState('');
  const postCommentProps = { comment, setComment, postId, user };

  return (
    <div className='space-y-4'>
      <div>
        <h1 className='flex items-center gap-2 text-xl font-bold'>
          Comments <span className='bg-papaya_whip-400 rounded-md px-2 text-lg'>{comments.length}</span>
        </h1>
        {!user && comment.length > 0 && (
          <p className='mt-2 text-red-500'>
            You're commenting as a guest,
            <span className='font-bold'>
              <Link to='/login'> Login </Link>
            </span>
            or
            <span className='font-bold'>
              <Link to='/signup'> Signup </Link>
            </span>
            to display your name.
          </p>
        )}
      </div>
      <PostComment {...postCommentProps} />
      {comments.length > 0 ? (
        <div className='space-y-8'>
          {comments.map((comment) => (
            <div key={comment.id} className='border-tea_green-400 space-y-2 border-b-2 pb-4'>
              <div className='flex items-center gap-1'>
                <UserAvatar name={!comment.user ? 'Guest' : comment.user.userName} />
                <p className='ml-3'>{!comment.user ? 'Guest' : comment.user.userName}</p>
              </div>
              <div className='ml-2'>
                <p className='mb-4'>{comment.content}</p>
                <div className='flex justify-between gap-2'>
                  <TimeAgo datetime={comment.dateCreated} />
                  {isAdmin && (
                    <DeleteContent
                      contentId={comment.id}
                      routeInfo={{ route: '/admin/comments', keyword: 'comments' }}
                      user={user}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Be the First to Comment!</p>
      )}
    </div>
  );
}
export default CommentList;
