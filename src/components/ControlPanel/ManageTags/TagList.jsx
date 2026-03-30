import { X as XIcon } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';

function TagList({ data, loading, setSelectedTag }) {
  const tags = loading || !data ? new Array(16).fill({}) : data.tags;
  return (
    <div className='space-y-4'>
      <h1 className='text-center text-2xl font-bold'>Tag List</h1>
      <div className='bg-tea_green-DEFAULT flex flex-wrap justify-center gap-4 rounded-md p-4'>
        {tags.length === 0 && <p>No Tags Found</p>}
        {tags.map((tag, i) => (
          <div
            key={tag.id ?? i}
            className='bg-beige-DEFAULT flex max-w-fit items-center justify-between gap-2 rounded-md p-2'
          >
            <p>{tag.name ?? <Skeleton width={'64px'} />}</p>
            {!loading && (
              <button
                className='h-fit w-fit hover:cursor-pointer hover:text-red-500'
                onClick={() => setSelectedTag({ id: tag.id, name: tag.name })}
              >
                <XIcon />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default TagList;
