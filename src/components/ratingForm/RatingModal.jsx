import { createPortal } from 'react-dom';
import modalCss from './Rating.module.css';
import { AiOutlineClose } from 'react-icons/ai';

const mobModal = document.querySelector('#rating-modal');

export function RatingModal({ children, onClose }) {
  return createPortal(
    <div className={modalCss.modal}>
      <AiOutlineClose
        className={modalCss.closeBtn}
        onClick={onClose}
        size={20}
      />
      <div onClick={onClose}>{children}</div>
    </div>,
    mobModal
  );
}
