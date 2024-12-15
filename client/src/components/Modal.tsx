import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

type modalProps = {
  openModal: Boolean;
  closeModal: Function;
  children: React.ReactNode;
}

function Modal({ openModal, closeModal, children }: modalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog className= 'modal' ref={ref} onCancel={() => closeModal()}>
      <button onClick={() => closeModal()}><FontAwesomeIcon icon={faX} className='fa-solid'/></button>
      {children}
    </dialog>
  );
}

export default Modal;