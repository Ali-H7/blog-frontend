import Dialog from './Dialog';
import { CircleX as ErrorIcon, X as CloseIcon } from 'lucide-react';

function Alert({
  position = 'top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2',
  dialogStatus,
  onClose,
  disableEscKey = false,
}) {
  const dialogProps = { position, dialogStatus, onClose, disableEscKey };
  const alertText = dialogStatus ?? '';
  return (
    <Dialog {...dialogProps}>
      <div className='bg-papaya_whip-400 relative flex items-center gap-4 rounded-md p-4'>
        <CloseIcon className='absolute top-2 right-4 hover:cursor-pointer' onClick={onClose} />
        <ErrorIcon className='shrink-0' size={48} />
        <div>
          <h1 className='font-bold'>Error!</h1>
          <p>{alertText}</p>
        </div>
      </div>
    </Dialog>
  );
}
export default Alert;
