import React from 'react';
import SignupForm from '../components/posts/SignupForm';

const SignUp = () => {
  return (
    <div className="container--sm">
      <div className="page-content__wrap">
        <h1 className="page-content__title page-content__title--center">
          회원가입
        </h1>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUp;
