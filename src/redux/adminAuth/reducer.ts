import { SAVE_ADMIN_STATUS } from './type';

import { adminActionType } from './action';

export type adminInitStateType = {
  admin_id: string;
  admin_token: string;
};

const adminInitState = {
  admin_id: '',
  admin_token: '',
};
const adminReducer = (state = adminInitState, action: adminActionType) => {
  switch (action.type) {
    case SAVE_ADMIN_STATUS:
      return {
        ...state,
        admin_id: action.payload.admin_id,
        admin_token: action.payload.admin_token,
      };

    default:
      return state;
  }
};

export default adminReducer;
