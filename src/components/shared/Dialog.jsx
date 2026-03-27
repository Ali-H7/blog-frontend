import { useEffect, useRef } from 'react';

function Dialog({
  position = 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  dialogStatus,
  onClose,
  disableEscKey = false,
  children,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !disableEscKey) return;

    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    dialog.addEventListener('keydown', handleEscapeKey);
    return () => dialog.removeEventListener('keydown', handleEscapeKey);
  }, [disableEscKey]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialogStatus) {
      dialog.close();
      return;
    }

    dialog.showModal();
  }, [dialogStatus]);

  return (
    <dialog className='relative bg-transparent backdrop:bg-black/65' ref={dialogRef} onClose={onClose}>
      <div className={` ${position} fixed flex w-full justify-center p-4`}>{children}</div>
    </dialog>
  );
}
export default Dialog;
