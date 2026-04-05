import Skeleton from 'react-loading-skeleton';

function PostLoading({ containerClasses }) {
  return (
    <div className={containerClasses}>
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
