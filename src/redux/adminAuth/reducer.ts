import { SAVE_ADMIN_STATUS } from './type';

import { adminActionType } from './action';

export type adminInitStateType = {
  admin_id: string | undefined;
  admin_token: string | undefined;
  admin_message: string | undefined;
};

const adminInitState = {
  admin_id: '',
  admin_token: '',
  admin_message: '',
};
const adminReducer = (state = adminInitState, action: adminActionType) => {
  switch (action.type) {
    case SAVE_ADMIN_STATUS:
      return {
        ...state,
        admin_id: action.payload.admin_id,
        admin_token: action.payload.admin_token,
        admin_message: action.payload.admin_message,
      };

    default:
      return state;
  }
};

export default adminReducer;
