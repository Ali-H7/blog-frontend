import Skeleton from 'react-loading-skeleton';

function PostEditorLoading() {
  return (
    <div className='space-y-4 p-8'>
      <div>
        <Skeleton height={'40px'} />
      </div>
      <div>
        <Skeleton height={'400px'} />
      </div>
      <div>
        <Skeleton height={'40px'} />
      </div>
      <div className='flex justify-end'>
        <Skeleton width={'120px'} height={'32px'} />
      </div>
      <div>
        <Skeleton height={'40px'} />
      </div>
    </div>
  );
}
export default PostEditorLoading;
