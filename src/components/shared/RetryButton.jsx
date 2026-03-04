import { Repeat2 as RetryIcon } from 'lucide-react';

function RetryButton({ error, retry }) {
  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <p className='text-center'>{error}</p>
      <button
        className='bg-tea_green-DEFAULT py-2 px-6 rounded-lg font-bold hover:cursor-pointer hover:bg-tea_green-400 flex gap-2 items-center'
        onClick={retry}
      >
        <p>Retry </p>
        <RetryIcon />
      </button>
    </div>
  );
}
export default RetryButton;
