import Skeleton from 'react-loading-skeleton';

function BlogCardLoading({ count = 1 }) {
  return (
    <>
      {new Array(count).fill({}).map((_, i) => (
        <div key={i} className='mb-4 flex flex-col gap-1 space-y-2 rounded-sm border border-black p-6'>
          <Skeleton width={'50%'} height={'24px'} />
          <Skeleton width={'35%'} />
          <div className='flex gap-2'>
            <Skeleton width={'48px'} />
            <Skeleton width={'48px'} />
            <Skeleton width={'48px'} />
          </div>
          <div>
            <Skeleton width={'100%'} />
            <Skeleton width={'35%'} />
          </div>
          <Skeleton width={'96px'} />
        </div>
      ))}
    </>
  );
}

export default BlogCardLoading;
