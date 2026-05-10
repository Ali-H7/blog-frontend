import { readingTime } from 'reading-time-estimator';
import dateFormat from 'dateformat';

function PostDetails({ rawText, dateCreated, title, tags, userName }) {
  const timeToRead = readingTime(rawText);
  const formattedDate = dateFormat(dateCreated, 'fullDate');

  return (
    <div className='space-y-2 rounded-sm'>
      <h1 className='text-xl font-bold'>{title}</h1>
      <div className='space-y-1 text-sm'>
        <p>
          Written By <span className='underline'>{userName}</span>
        </p>
        <p>
          {formattedDate} · {timeToRead.text}
        </p>
      </div>
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
