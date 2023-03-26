import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from './type';

export type actionType = {
  type: string;
};

export const addSubscriber = () => {
  console.log('확인해보자.');
  return {
    type: ADD_SUBSCRIBER,
  };
};
export const removeSubscriber = () => {
  return {
    type: REMOVE_SUBSCRIBER,
  };
};
