import React, { useEffect, useState } from 'react';
import { ReactComponent as CloseBtn } from '../../assets/close-btn.svg';
import style from './Modal.module.scss';

const Modal = ({
  children,
  isOpen,
  closeModal,
}: {
  children?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <div className={isOpen ? style['popup--open'] : style['popup--close']}>
      <div className={style['popup']}>
        <div className={style['popup__back']} onClick={closeModal}></div>
        <div className={style['popup__content-wrap']}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
