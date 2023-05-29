import React, { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';

//api
import { loginUser } from '../../api/user';
import { loginAdmin } from '../../api/admin';

//redux
import { connect } from 'react-redux';

//action
import { fetchAdminData } from '../../redux/adminAuth/action';

//type
import { adminInitStateType } from '../../redux/adminAuth/reducer';
export type loginDataType = {
  [key: string]: string;
};
export type loginHasTokenDataType = {
  // [key: string]: string;
  user_name: string;
  user_token: string;
};
type importedAdminAuthInitStateType = {
  adminAuth: adminInitStateType;
};

//component
const AdminLoginForm = (props: any) => {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const onAdminIdHandler = (e: React.ChangeEvent<any>) => {
    setAdminId(e.target.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<any>) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const adminData: loginDataType = {
      admin_id: adminId,
      admin_password: password,
    };

    console.log(props.fetchAdminData(adminData));
  };

  useEffect(() => {
    if (props.admin_token !== '' && props.admin_token !== undefined) {
      navigate('/admin-dashboard');
    }
  });

  return (
    <div>
      <form className="post-form">
        <div className="input-wrap">
          <input
            className="input--only-input"
            type="text"
            placeholder="아이디"
            onChange={onAdminIdHandler}
          />
          <input
            className="input--only-input"
            type="password"
            placeholder="비밀번호"
            onChange={onPasswordHandler}
          />
        </div>
        <button className="cta-btn--block" onClick={onSubmitHandler}>
          로그인
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ adminAuth }: importedAdminAuthInitStateType) => {
  return {
    admin_id: adminAuth.admin_id,
    admin_token: adminAuth.admin_token,
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
    fetchAdminData: (adminData: loginDataType) =>
      dispatch(fetchAdminData(adminData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginForm);
