import React from 'react';
import { connect } from 'react-redux';
import { addSubscriber } from '../../redux/subscriber/action';
import { initStateType } from '../../redux/subscriber/reducer';

type propsType = {
  count: number;
  addSubscriber: Function;
  // children?: any;
};

const Subscribers = ({ count, addSubscriber }: propsType) => {
  return (
    <div>
      <h2>구독자 수 : {count}</h2>
      <button onClick={() => addSubscriber()}>구독하기</button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);
