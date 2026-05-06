import { Repeat2 as RetryIcon } from 'lucide-react';

function RetryButton({ error, retry }) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-8'>
      <p className='text-center'>{error}</p>
      <button
        className='bg-tea_green-DEFAULT hover:bg-tea_green-400 flex items-center gap-2 rounded-lg px-6 py-2 font-bold hover:cursor-pointer'
        onClick={retry}
      >
        <p>Retry </p>
        <RetryIcon />
      </button>
    </div>
  );
}
export default RetryButton;
