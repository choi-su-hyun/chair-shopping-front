import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-default.png';
import style from '../css/Header.module.scss';
import { connect } from 'react-redux';
import { ReactComponent as UserLogin } from '../assets/userLogin.svg';
import { ReactComponent as UserSignUp } from '../assets/user-sign-up.svg';
import { ReactComponent as UserCart } from '../assets/user-cart.svg';
import { ReactComponent as UserLogout } from '../assets/user-logout.svg';

const Header = (props: any) => {
  return (
    <header>
      <div className="container">
        <div className={style.header}>
          <Link to="/main">
            <img src={logo} alt="" />
          </Link>
          <nav className={style.nav}>
            <div className={style.nav__menu}>
              <Link to="/main" className="general-btn--text">
                홈
              </Link>
              <Link to="/main" className="general-btn--text">
                회사소개
              </Link>
              <Link to="/main" className="general-btn--text">
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
                <Link to="/login" className="round-btn">
                  <UserCart />
                </Link>
                <div className={style.divider}>|</div>
                <Link to="/signup" className="round-btn">
                  <UserLogout />
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user_token: state.userAuth.user_token,
  };
};
export default connect(mapStateToProps)(Header);
