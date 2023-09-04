import React, { useState } from 'react';
import { registerUser } from '../../api/user';
import { ISignupData } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import { checkEmail, checkPhoneNum } from '../../utils/textChecker';

const SignupForm = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const navigate = useNavigate();

  const onUserIdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkEmail(e.target.value)) {
      setEmail(e.target.value);
      // console.log('올바름');
    } else {
      // console.log('올바르지 않음');
    }
  };
  const onPhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkPhoneNum(e.target.value)) {
      setPhone(e.target.value);
      // console.log('올바름');
    } else {
      // console.log('올바르지 않음');
    }
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit!');

    const userData: ISignupData = {
      user_id: userId,
      user_password: password,
      user_name: name,
      user_email: email,
      user_phone: phone,
    };
    console.log(userData);
    registerUser(userData);
    navigate('/login');
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
            <div className="input-wrap--has-label">
              <label htmlFor="">아이디</label>
              <input
                type="text"
                onChange={onUserIdHandler}
                placeholder="아이디를 입력해주세요"
                required
              />
            </div>
            <div className="input-wrap--has-label">
              <label htmlFor="">비밀번호</label>
              <input
                type="password"
                onChange={onPasswordHandler}
                placeholder="비밀번호를 입력해주세요"
                required
              />
            </div>
            <div className="input-wrap--has-label">
              <label htmlFor="">비밀번호 확인</label>
              <input
                type="password"
                onChange={onPasswordHandler}
                placeholder="비밀번호 확인란입니다"
                required
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
            <div className="input-wrap--has-label">
              <label htmlFor="">이름</label>
              <input
                type="text"
                onChange={onNameHandler}
                placeholder="이름을 입력해주세요"
                required
              />
            </div>
            <div className="input-wrap--has-label">
              <label htmlFor="">이메일</label>
              <input
                type="email"
                onChange={onEmailHandler}
                placeholder="이메일을 입력해주세요"
                required
              />
            </div>
            <div className="input-wrap--has-label">
              <label htmlFor="">전화번호</label>
              <input
                type="text"
                onChange={onPhoneHandler}
                placeholder="'-'를 제외한 전화번호를 입력해주세요"
                required
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
