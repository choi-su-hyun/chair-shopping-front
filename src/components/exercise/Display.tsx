import React from 'react';
import { connect } from 'react-redux';
import { initStateType } from '../../redux/subscriber/reducer';

type propsType = {
  count: number;
};

const Display = ({ count }: propsType) => {
  return <div>구독자 수 (다른 컴포넌트) {count}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    count: state.subscriber.count,
  };
};

export default connect(mapStateToProps)(Display);
