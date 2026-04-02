import { readingTime } from 'reading-time-estimator';
import dateFormat from 'dateformat';

function PostDetails({ rawText, dateCreated, title, tags }) {
  const timeToRead = readingTime(rawText);
  const formattedDate = dateFormat(dateCreated, 'fullDate');

  return (
    <div className='space-y-2 rounded-sm p-6'>
      <h1 className='text-xl font-bold'>{title}</h1>
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
    </div>
  );
}
export default PostDetails;
