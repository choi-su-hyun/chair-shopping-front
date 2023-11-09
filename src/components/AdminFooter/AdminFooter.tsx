import React from 'react';
import logoLight from '../../assets/logo-light.png';
import style from './AdminFooter.module.scss';

const AdminFooter = () => {
  return (
    <footer className={style['footer']}>
      <div className="container--big">
        <img src={logoLight} alt="" />
        <div className={style['footer__content']}>
          <p>상호명: Relaxing Time | 대표자: 최수현 | 연락처: 010-1111-1111</p>
          <p>*이 사이트는 포트폴리오 사이트 입니다.</p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
