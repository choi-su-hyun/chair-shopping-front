import React, { useContext } from 'react';
import { Context } from '../context/context';

function Main() {
  const user = useContext(Context);
  const handleClick = () => {};
  return (
    <div>
      Main
      <div>{user.name}</div>
      <button onClick={handleClick}></button>
    </div>
  );
}

export default Main;
