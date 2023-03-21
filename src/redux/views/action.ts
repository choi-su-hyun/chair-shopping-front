import { ADD_VIEWS } from './type';

export type actionType = {
  type: string;
  payload: number;
};
export const addViews = (number: number) => {
  return {
    type: ADD_VIEWS,
    payload: Number(number),
  };
};
