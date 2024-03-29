import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-default.png';
import style from './Header.module.scss';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as UserLogin } from '../../assets/userLogin.svg';
import { ReactComponent as UserSignUp } from '../../assets/user-sign-up.svg';
import { ReactComponent as UserCart } from '../../assets/user-cart.svg';
import { ReactComponent as UserLogout } from '../../assets/user-logout.svg';

import { IHeaderProps } from '../../types/common';
import { RootState } from '../../redux/rootReducer';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { recieveCookieUserData } from '../../redux/userAuth/action';
import { removeCookie } from '../../utils/reactCookie';

const Header = (props: IHeaderProps) => {
  let navigate = useNavigate();

  const logoutStart = () => {
    removeCookie('user_name', { path: '/' });
    removeCookie('user_token', { path: '/' });
    removeCookie('user_refreshToken', { path: '/' });
    props.recieveCookieUserData();
    navigate('/');
    // window.location.href = '/';
  };
  return (
    <header>
      <div className="container">
        <div className={style.header}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <nav className={style.nav}>
            <div className={style.nav__menu}>
              <Link to="/" className="general-btn--text">
                홈
              </Link>
              <Link to="/abcd/ab" className="general-btn--text">
                회사소개
              </Link>
              <Link to="/product" className="general-btn--text">
                모든 의자
              </Link>
            </div>
            {!props.user_token && (
              <div className={style.nav__auth}>
                <Link to="/login" className="round-btn">
                  <UserLogin />
                </Link>
                <div className={style.divider}>|</div>
                <Link to="/signup" className="round-btn">
                  <UserSignUp></UserSignUp>
                </Link>
              </div>
            )}
            {props.user_token && (
              <div className={style.nav__auth}>
                <Link to="/cart" className="round-btn">
                  <UserCart />
                </Link>
                <div className={style.divider}>|</div>
                <button className="round-btn" onClick={logoutStart}>
                  <UserLogout />
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user_token: state.userAuth.user_token,
    admin_token: state.adminAuth.admin_token,
  };
};
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
) => {
  return {
    recieveCookieUserData: () => {
      dispatch(recieveCookieUserData());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
