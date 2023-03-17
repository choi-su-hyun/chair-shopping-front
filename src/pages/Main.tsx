import React, { useContext } from 'react';
import { Context } from '../context/context';
import { counterProps } from '../App';

type example = (num: number) => void;

function Main({ increase }: { increase: (num: number) => void }) {
  const user = useContext(Context);
  const plusHandler = (e: React.MouseEvent) => {
    increase(1);
    // console.log(props);
  };
  return (
    <div>
      Main
      <div>{user.name}</div>
      <button onClick={plusHandler}>증가</button>
    </div>
  );
}

export default Main;
