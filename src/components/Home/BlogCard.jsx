import { Link } from 'react-router';
import dateFormat from 'dateformat';
import { readingTime } from 'reading-time-estimator';
import truncate from '../../helpers/truncate';

function BlogCard({ post }) {
  const { title, content, dateCreated, tags } = post;
  const timeToRead = readingTime(content);
  const formattedDate = dateFormat(dateCreated, 'fullDate');
  const contentPreview = truncate(content, 128);
  return (
    <Link to={`/post/${post.slug}`}>
      <div className='border rounded-sm p-6 space-y-2'>
        <h1 className='font-bold text-xl'>{title}</h1>
        <p className='text-sm'>
          {formattedDate} · {timeToRead.text}
        </p>
        {tags.length > 0 && (
          <ul className='flex gap-2 text-xs flex-wrap'>
            {tags.map((tag) => (
              <li key={tag.id} className='border p-1 rounded-sm'>
                {tag.name}
              </li>
            ))}
          </ul>
        )}
        <p>{contentPreview}</p>
        <p className='hover:border-b-black w-fit border-b border-b-transparent'>Read more →</p>
      </div>
    </Link>
  );
}

export default BlogCard;
