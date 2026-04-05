import TimeAgo from 'timeago-react';
import UserAvatar from './UserAvatar';

function CommentList({ comments }) {
  return (
    <div className='space-y-4'>
      <div>
        <h1 className='flex items-center gap-2 text-xl font-bold'>
          Comments <span className='bg-papaya_whip-400 rounded-md px-2 text-lg'>{comments.length}</span>
        </h1>
      </div>
      {comments.length > 0 ? (
        <div className='space-y-8'>
          {comments.map((comment) => (
            <div key={comment.id} className='space-y-2'>
              <div className='flex items-center gap-1'>
                <UserAvatar letter={!comment.user ? 'G' : comment.user.userName[0]} />
                <p>{!comment.user ? 'Guest' : comment.user.userName}</p>
                <p>·</p>
                <TimeAgo datetime={comment.dateCreated} />
              </div>
              <p className='ml-2'>{comment.content}</p>
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
