import React, { useState } from 'react';

//api
import { loginUser } from '../../api/user';

//redux
import { connect } from 'react-redux';

//action
// import { changeUserData } from '../../redux/userAuth/action';
import { fetchUserData } from '../../redux/userAuth/action';

import { userAuthInitStateType } from '../../redux/userAuth/reducer';

//type
export type loginDataType = {
  [key: string]: string;
};
export type loginHasTokenDataType = {
  // [key: string]: string;
  user_name: string;
  user_token: string;
};
type importedUserAuthInitStateType = {
  userAuth: userAuthInitStateType;
};

//component
const LoginForm = (props: any) => {
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
    // const result: any = await loginUser(userData);
    // console.log('loginData 값', result.loginResponsedData);

    // const loginHasTokenData: loginHasTokenDataType = {
    //   user_name: result.loginResponsedData.data.nickName,
    //   user_token: result.loginResponsedData.data.token,
    // };

    // console.log('loginHasTokenData 값', loginHasTokenData);
    console.log('props 값', props);
    props.fetchUserData(userData);
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
    user_name: userAuth.user_name,
    user_token: userAuth.user_token,
  };
};

// const mapDispatchToProps = {
//   fetchUserData: (userData: any) => {
//     fetchUserData(userData);
//   },
//   // fetchUserData,
//   // changeUserData,
// };
const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserData: (userData: loginDataType) =>
      dispatch(fetchUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
