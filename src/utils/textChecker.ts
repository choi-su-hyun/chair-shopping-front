const checkEmail = (email: string) => {
  const regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(email);
};
const checkPhoneNum = (phoneNum: string) => {
  const regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  return regExp.test(phoneNum);
};

export { checkEmail, checkPhoneNum };
