import { NEW_POPUP_CONTENT, POPUP_ON, POPUP_OFF } from './type';

const saveNewPopup = (content: any) => {
  return {
    type: NEW_POPUP_CONTENT,
    payload: content,
  };
};

const popupOff = () => {
  return {
    type: POPUP_OFF,
  };
};

export { saveNewPopup, popupOff };