// CSS
import s from "@/styles/components/Modal.module.css";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
      <div className={s.modal}>
        <div className={s.modalChildren}>
          {children}
        </div>
      </div>
  );
};

export default Modal;
