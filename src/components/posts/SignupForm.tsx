import React, { useState } from 'react';

const SignupForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onUserIdHandler = (e: React.ChangeEvent<any>) => {
    setUserId(e.target.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<any>) => {
    setPassword(e.target.value);
  };
  const onNameHandler = (e: React.ChangeEvent<any>) => {
    setName(e.target.value);
  };
  const onEmailHandler = (e: React.ChangeEvent<any>) => {
    setEmail(e.target.value);
  };
  const onPhoneHandler = (e: React.ChangeEvent<any>) => {
    setPhone(e.target.value);
  };
  const onSubmitHandler = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log('submit!');

    const body = {
      user_id: userId,
      user_password: password,
      user_name: name,
      user_email: email,
      user_phone: phone,
    };
    console.log(body);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="post-form">
        <div className="post-form__input-wrap">
          <div className="post-form__sub-text">
            <h3>로그인 정보</h3>
            <span>(로그인을 위해 생성할 계정정보를 입력하세요)</span>
          </div>
          <div className="input__background">
            <div className="input-wrap">
              <label htmlFor="">아이디</label>
              <input
                type="text"
                onChange={onUserIdHandler}
                placeholder="아이디를 입력해주세요"
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="">비밀번호</label>
              <input
                type="password"
                onChange={onPasswordHandler}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="">비밀번호 확인</label>
              <input
                type="password"
                onChange={onPasswordHandler}
                placeholder="비밀번호 확인란입니다"
              />
            </div>
          </div>
        </div>

        <div className="post-form__input-wrap">
          <div className="post-form__sub-text">
            <h3>회원 정보</h3>
            <span>(회원 관리를 위해 사용됩니다)</span>
          </div>
          <div className="input__background">
            <div className="input-wrap">
              <label htmlFor="">이름</label>
              <input
                type="text"
                onChange={onNameHandler}
                placeholder="이름을 입력해주세요"
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="">이메일</label>
              <input
                type="email"
                onChange={onEmailHandler}
                placeholder="이메일을 입력해주세요"
              />
            </div>
            <div className="input-wrap">
              <label htmlFor="">전화번호</label>
              <input
                type="text"
                onChange={onPhoneHandler}
                placeholder="'-'를 제외한 전화번호를 입력해주세요"
              />
            </div>
          </div>
        </div>

        <button className="cta-btn--block">회원가입</button>
      </form>
    </div>
  );
};

export default SignupForm;
