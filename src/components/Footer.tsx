import React from 'react';
import logoLight from '../assets/logo-light.png';
import style from '../css/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className="container">
        <img src={logoLight} alt="" />
        <p className={style.footer__content}>
          상호명: Relaxing Time | 대표자: 최수현 | 연락처: 010-1111-1111
        </p>
        <p className={`${style.footer__content} ${style.footer__notice}`}>
          *이 사이트는 포트폴리오 사이트 입니다.
        </p>
      </div>
    </footer>
  );
}
