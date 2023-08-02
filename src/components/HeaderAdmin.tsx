import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-default.png';
import style from '../css/Header.module.scss';
import { connect } from 'react-redux';
import { deleteCookie } from '../utils/cookie';
import { recieveCookieUserData } from '../redux/userAuth/action';
import { useNavigate } from 'react-router-dom';

//svg component
import { ReactComponent as UserLogin } from '../assets/userLogin.svg';
import { ReactComponent as UserSignUp } from '../assets/user-sign-up.svg';
import { ReactComponent as UserCart } from '../assets/user-cart.svg';
import { ReactComponent as AdminLogout } from '../assets/user-logout.svg';

const HeaderAdmin = (props: any) => {
  let navigate = useNavigate();
  const logoutStart = () => {
    deleteCookie('admin_name');
    deleteCookie('admin_token');
    window.location.href = '/admin';
  };
  return (
    <div className="container">
      <div className={style.admin_header_notice}>
        여기는 관리자 페이지입니다.
      </div>
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

const mapStateToProps = (state: any) => {
  return {
    user_token: state.userAuth.user_token,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    recieveCookieUserData: () => {
      recieveCookieUserData();
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderAdmin);
