import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface Props {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => unknown;
}

export default function Modal({ children, isOpen, onClose }: Props): JSX.Element {
  if (!isOpen) {
    return null!;
  }

  const content = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <button type="button" data-test="close" className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(content, document.querySelector('#modal')!);
}
