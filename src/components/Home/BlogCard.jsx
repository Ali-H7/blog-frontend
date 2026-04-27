import { Link } from 'react-router';
import dateFormat from 'dateformat';
import { readingTime } from 'reading-time-estimator';
import truncate from '../../helpers/truncate';
import { useAuth } from '../../context/AuthContext';
import { SquarePen as EditIcon } from 'lucide-react';
import DeleteContent from '../shared/DeleteContent';

function BlogCard({ post, deletePost }) {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;
  const { title, rawText, dateCreated, tags } = post;
  const timeToRead = readingTime(rawText);
  const formattedDate = dateFormat(dateCreated, 'fullDate');
  const contentPreview = truncate(rawText, 128);

  return (
    <div className='space-y-2 rounded-sm border p-6'>
      <Link to={`/posts/${post.slug}`}>
        <h1 className='mb-2 text-xl font-bold'>{title}</h1>
      </Link>
      <p className='text-sm'>
        {formattedDate} · {timeToRead.text}
      </p>
      {tags.length > 0 && (
        <ul className='flex flex-wrap gap-2 text-xs'>
          {tags.map((tag) => (
            <li key={tag.id} className='rounded-sm border p-1'>
              {tag.name}
            </li>
          ))}
        </ul>
      )}
      <p>{contentPreview}</p>
      <Link to={`/posts/${post.slug}`}>
        <p className='w-fit border-b border-b-transparent hover:border-b-black'>Read more →</p>
      </Link>
      {isAdmin && (
        <div className='flex justify-end gap-4'>
          <button>
            <EditIcon className='hover:text-papaya_whip-300 cursor-pointer' />
          </button>
          <DeleteContent contentId={post.id} route={'/admin/posts'} user={user} onSuccess={() => deletePost(post.id)} />
        </div>
      )}
    </div>
  );
}

export default BlogCard;
