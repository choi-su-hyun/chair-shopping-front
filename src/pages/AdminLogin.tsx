import React from 'react';

//component
import AdminLoginForm from '../components/posts/AdminLoginForm';

const AdminLogin = () => {
  return (
    <div>
      <div className="container--sm">
        <div className="page-content__wrap">
          <h1 className="page-content__title page-content__title--center">
            관리자 로그인
          </h1>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
