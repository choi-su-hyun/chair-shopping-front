import { SAVE_USER_IDX } from './type';

export type userAuthActionType = {
  type: string;
  payload: string;
};

export const changeUserData = () => {
  return {
    type: SAVE_USER_IDX,
  };
};
