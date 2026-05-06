import { X as CloseIcon, LoaderCircle as LoadingIcon } from 'lucide-react';

function DialogWithConfirmBtn({ options }) {
  return (
    <div className='bg-papaya_whip-400 relative flex max-w-xl items-center gap-4 rounded-md p-4'>
      <button
        disabled={options.isPending}
        className='absolute top-2 right-4 hover:cursor-pointer disabled:hover:cursor-not-allowed'
        onClick={options.onClose}
      >
        <CloseIcon />
      </button>
      <div className='space-y-2'>
        <h1 className='text-center font-bold'>{options.title}</h1>
        {options.error && <p className='text-center text-red-600'>Something went wrong, please try again later!</p>}
        <p className='mb-4'>{options.textContent}</p>
        <button
          className='bg-tea_green-300 hover:bg-tea_green-200 flex w-full justify-center gap-4 p-2 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500'
          onClick={options.mutate}
          disabled={options.isPending}
        >
          <p>Confirm</p>
          {options.isPending && <LoadingIcon className='animate-spin' />}
        </button>
      </div>
    </div>
  );
}

export default DialogWithConfirmBtn;
