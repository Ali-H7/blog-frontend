import Dialog from '../shared/Dialog';
import { useState } from 'react';
import { X as CloseIcon } from 'lucide-react';

function MemberMessage({ user }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const onClose = () => setIsDialogOpen(false);

  return (
    <div>
      <p className='text-center'>
        Welcome, <span className='font-bold'>{user.userName}</span> You currently have Member only access.
        <span className='font-bold'>
          {' '}
          <button className='hover:cursor-pointer hover:underline' onClick={openDialog}>
            Request admin privileges.
          </button>
        </span>
      </p>
      {isDialogOpen && (
        <Dialog
          position={'top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'}
          dialogStatus={isDialogOpen}
          onClose={onClose}
        >
          <div className='bg-papaya_whip-400 relative flex max-w-xl items-center gap-4 rounded-md p-4'>
            <CloseIcon className='absolute top-2 right-4 hover:cursor-pointer' onClick={onClose} />
            <div className='space-y-2'>
              <h1 className='text-center font-bold'>Please Read!</h1>
              <p className='mb-4'>
                This access is for testing purposes only. Please do not delete, edit, or post inappropriate content.
                Help us keep the environment clean and functional for everyone.
              </p>
              <div className='flex gap-2 font-bold'>
                <button className='bg-tea_green-300 hover:bg-tea_green-200 w-full p-2 hover:cursor-pointer'>
                  Confirm
                </button>
                <button
                  className='bg-light_bronze-400 hover:bg-light_bronze-300 w-full p-2 hover:cursor-pointer'
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default MemberMessage;
