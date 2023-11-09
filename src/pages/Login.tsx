import React from 'react';
import LoginForm from '../components/posts/LoginForm/LoginForm';

const Login = () => {
  return (
    <div className="container--sm">
      <div className="page-content__wrap">
        <h1 className="page-content__title page-content__title--center">
          로그인
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
