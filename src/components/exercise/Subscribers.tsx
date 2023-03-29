import React from 'react';
import { connect } from 'react-redux';
import { addSubscriber } from '../../redux/subscriber/action';
// import { changeUserData } from '../../redux/userAuth/action';

import { initStateType } from '../../redux/subscriber/reducer';

type propsType = {
  count: number;
  addSubscriber: Function;
};

const Subscribers = ({ count, addSubscriber, changeUserData }: any) => {
  const testUserData = {
    user_name: 'test 이름',
    user_token: 'test 토큰',
  };
  return (
    <div>
      <h2>구독자 수 : {count}</h2>
      <button onClick={() => addSubscriber()}>구독하기</button>
      <button onClick={() => changeUserData(testUserData)}>
        changeUserData
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    count: state.subscriber.count,
  };
};
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     addSubscriber: () => dispatch(addSubscriber()),
//   };
// };
const mapDispatchToProps = {
  addSubscriber: addSubscriber,
  changeUserData: (testUserData: any) => {
    // changeUserData(testUserData);
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);
