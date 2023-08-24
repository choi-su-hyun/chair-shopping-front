import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchAdminData } from '../../redux/adminAuth/action';
import {
  IAdminLoginData,
  IStateAndDispatchInProps,
} from '../../types/administrator';
import { RootState } from '../../redux/rootReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Matching } from 'react-redux';

// type DispatchProps = ReturnType<typeof mapDispatchToProps>;
// type CombinedProps = Matching<DispatchProps, IStateAndDispatchInProps>;

const AdminLoginForm = (props: IStateAndDispatchInProps) => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onAdminIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminId(e.target.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const adminData: IAdminLoginData = {
      admin_id: adminId,
      admin_password: password,
    };

    props.fetchAdminData(adminData);
  };

  useEffect(() => {
    if (props.admin_token !== '' && props.admin_token !== undefined) {
      navigate('/admin-dashboard');
    }
  }, [props.admin_token]);

  return (
    <div>
      <form className="post-form" onSubmit={onSubmitHandler}>
        <div className="input-wrap">
          <input
            className="input--only-input admin"
            type="text"
            placeholder="아이디"
            onChange={onAdminIdHandler}
          />
          <input
            className="input--only-input admin"
            type="password"
            placeholder="비밀번호"
            onChange={onPasswordHandler}
          />
          <div className="notice__wrap">
            <span className="notice__text">{props.admin_message}</span>
          </div>
        </div>
        <button className="cta-btn--block admin">로그인</button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ adminAuth }: RootState) => {
  return {
    admin_id: adminAuth.admin_id,
    admin_token: adminAuth.admin_token,
    admin_message: adminAuth.admin_message,
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
    fetchAdminData: (adminData: IAdminLoginData) =>
      dispatch(fetchAdminData(adminData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginForm);
