import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-default.png';
import style from './Header.module.scss';
import { deleteCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as AdminLogout } from '../../assets/user-logout.svg';

const HeaderAdmin = () => {
  let navigate = useNavigate();
  const logoutStart = () => {
    deleteCookie('admin_name');
    deleteCookie('admin_token');
    window.location.href = '/admin';
  };
  return (
    <div className="container--big">
      <div className={style.header}>
        <Link to="/admin-dashboard">
          <img src={logo} alt="" />
        </Link>
        <nav className={style.nav}>
          <div className={style.nav__menu}>
            <Link to="/admin-create" className="general-btn--text">
              상품 추가하기
            </Link>
          </div>
          <div className={style.nav__auth}>
            <button
              className="round-btn round-btn--admin"
              onClick={logoutStart}
            >
              <AdminLogout />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderAdmin;
