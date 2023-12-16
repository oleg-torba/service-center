import { createPortal } from 'react-dom';
import modalCss from "./modal.module.css"
import {AiOutlineClose} from "react-icons/ai"

const mobModal= document.querySelector('#mob-modal');

export function MobModal({ children, onClose }) {
    return createPortal(
        <div className={modalCss.modal}>
       <AiOutlineClose className={modalCss.closeBtn} onClick={onClose} size={20}/><div onClick={onClose}>{children}</div>
        </div>
      ,
     mobModal
    );
  }