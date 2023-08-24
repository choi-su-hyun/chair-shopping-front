import { SAVE_ADMIN_STATUS } from './type';

import { IAdminAction } from '../../types/administrator';
import { IAdminInitState } from '../../types/administrator';

const adminInitState: IAdminInitState = {
  admin_id: '',
  admin_token: '',
  admin_message: '',
};
const adminReducer = (state = adminInitState, action: IAdminAction) => {
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
