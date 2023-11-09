import React from 'react';
import logo from '../../assets/logo-default.png';
import style from './AdminHeader.module.scss';
import { deleteCookie } from '../../utils/cookie';
import { useNavigate, Link } from 'react-router-dom';

import { ReactComponent as AdminLogout } from '../../assets/user-logout.svg';
import { ReactComponent as StoreIcon } from '../../assets/store-icon.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/rootReducer';

const AdminHeader = () => {
  let navigate = useNavigate();
  const logoutStart = () => {
    deleteCookie('admin_name');
    deleteCookie('admin_token');
    window.location.href = '/admin';
  };
  const isLogin = useSelector(
    (state: RootState) => state.adminAuth.admin_token,
  );
  return (
    <div>
      <div className={style['header-wrap']}>
        <Link to="/admin-dashboard">
          <img src={logo} alt="" />
        </Link>
        <nav>
          <span>
            안녕하세요. <b>관리자 페이지</b>입니다.
          </span>
          <div>
            {isLogin ? (
              <button
                className="round-btn round-btn--admin"
                onClick={logoutStart}
              >
                <AdminLogout />
              </button>
            ) : (
              <Link className="block-btn admin have-icon" to={'/'}>
                <StoreIcon />
                상점 사이트로 돌아가기
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminHeader;
