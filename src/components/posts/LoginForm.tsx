import React, { useEffect, useState } from 'react';
import { ILoginData, IStateAndDispatchInProps } from '../../types/user';
import { connect } from 'react-redux';
import { fetchUserData } from '../../redux/userAuth/action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../redux/rootReducer';
import { AnyAction } from 'redux';
import { Matching } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { setCookie as testSetCookie } from '../../utils/cookie';

// type IMapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
// type CombinedProps = Matching<IMapDispatchToProps, IStateAndDispatchInProps>;

const LoginForm = (props: IStateAndDispatchInProps) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  // const [cookies, setCookie] = useCookies(['test_name']);
  // const [cookies2, setCookie2] = useCookies(['user_name']);

  const onUserIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const onPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: ILoginData = {
      user_id: userId,
      user_password: password,
    };
    await props.fetchUserData(userData);
    navigate('/');
  };

  return (
    <div>
      <form className="post-form" onSubmit={onSubmitHandler}>
        <div className="input-wrap">
          <input
            required
            className="input--only-input"
            type="text"
            placeholder="아이디"
            onChange={onUserIdHandler}
          />
          <input
            required
            className="input--only-input"
            type="password"
            placeholder="비밀번호"
            onChange={onPassword}
          />
          <div className="notice__wrap">
            <span className="notice__text">{props.user_message}</span>
          </div>
        </div>
        <button className="cta-btn--block">로그인</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ userAuth }: RootState) => {
  return {
    user_name: userAuth.user_name,
    user_token: userAuth.user_token,
    user_message: userAuth.user_message,
  };
};

// const mapDispatchToProps = {
//   fetchUserData: (userData: any) => {
//     fetchUserData(userData);
//   },
//   // fetchUserData,
//   // changeUserData,
// };
const mapDispatchToProps = (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
) => {
  return {
    fetchUserData: (userData: ILoginData) => dispatch(fetchUserData(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
