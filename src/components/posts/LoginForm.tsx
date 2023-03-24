import React, { useState } from 'react';
import { loginUser } from '../../api/user';
import { connect } from 'react-redux';
import { changeUserData } from '../../redux/userAuth/action';

import { userAuthInitStateType } from '../../redux/userAuth/reducer';

export type loginDataType = {
  [key: string]: string;
};
type importedUserAuthInitStateType = {
  userAuth: userAuthInitStateType;
};

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const onUserIdHandler = (e: React.ChangeEvent<any>) => {
    setUserId(e.target.value);
  };
  const onPassword = (e: React.ChangeEvent<any>) => {
    setPassword(e.target.value);
  };
  const onSubmitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const userData: loginDataType = {
      user_id: userId,
      user_password: password,
    };
    const loginData = loginUser(userData).then();
    console.log('loginData 값', loginData);
  };
  return (
    <div>
      <form className="post-form">
        <div className="input-wrap">
          <input
            className="input--only-input"
            type="text"
            placeholder="아이디"
            onChange={onUserIdHandler}
          />
          <input
            className="input--only-input"
            type="password"
            placeholder="비밀번호"
            onChange={onPassword}
          />
        </div>
        <button className="cta-btn--block" onClick={onSubmitHandler}>
          로그인
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ userAuth }: importedUserAuthInitStateType) => {
  return {
    user_idx: userAuth.user_idx,
    user_token: userAuth.user_token,
  };
};

const mapDispatchToProps = {
  changeUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
