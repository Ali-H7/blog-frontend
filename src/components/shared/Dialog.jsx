import { useEffect, useRef } from 'react';

function Dialog({ position = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', dialogStatus, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialogStatus) {
      dialog.close();
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }, [dialogStatus]);
  return (
    <dialog className='relative bg-transparent backdrop:bg-black/65' ref={dialogRef}>
      <div className={` ${position} fixed flex w-full justify-center p-4`}>{children}</div>
    </dialog>
  );
}
export default Dialog;
