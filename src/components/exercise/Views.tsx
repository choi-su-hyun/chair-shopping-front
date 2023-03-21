import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addViews } from '../../redux/views/action';
import { initStateType } from '../../redux/views/reducer';
import { actionType } from '../../redux/views/action';

type propsType = {
  viewCount: number;
  addViews: Function;
};

type stateType = {
  view: initStateType;
};

const Views = ({ viewCount, addViews }: propsType) => {
  const [number, setNumber] = useState<number | string | undefined>(1);
  console.log(number);
  return (
    <div>
      조회수 {viewCount}
      <input
        type="number"
        value={number}
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <button onClick={() => addViews(number)}>조회수 높이기</button>
    </div>
  );
};

const mapStateToProps = ({ view }: stateType) => {
  return {
    viewCount: view.viewCount,
  };
};
const mapDispatchToProps = {
  addViews: (number: number) => addViews(number),
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
