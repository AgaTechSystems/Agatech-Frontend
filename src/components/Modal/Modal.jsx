import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ showModal, setShowModal }) => {
  return (
    showModal && (
      <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
        <div className={styles.modalContent}>
          <h2>Coming soon!</h2>
        </div>
      </div>
    )
  );
};

export default Modal;
