import Skeleton from 'react-loading-skeleton';

function PostLoading() {
  return (
    <div className='space-y-8 px-4 pt-8 pb-4'>
      <div>
        <Skeleton height={'32px'} width={'128px'} />
        <Skeleton height={'16px'} width={'128px'} />
        <Skeleton height={'16px'} width={'256px'} />
      </div>
      <div>
        <Skeleton count={'8'} />
      </div>
      <div>
        <Skeleton height={'192px'} />
      </div>
    </div>
  );
}

export default PostLoading;
