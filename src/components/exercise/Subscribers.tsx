import React from 'react';
import { connect } from 'react-redux';
import { addSubscriber } from '../../redux/subscriber/action';
import { initStateType } from '../../redux/subscriber/reducer';

type propsType = {
  count: initStateType;
  addSubscriber: Function;
};
type test = {
  count: initStateType;
};

const Subscribers = ({ count, addSubscriber }: any) => {
  return (
    <div>
      <h2>구독자 수 : {count}</h2>
      <button onClick={() => addSubscriber()}>구독하기</button>
    </div>
  );
};

const mapStateToProps = (state: test) => {
  return {
    count: state.count,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addSubscriber: () => dispatch(addSubscriber()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subscribers);
