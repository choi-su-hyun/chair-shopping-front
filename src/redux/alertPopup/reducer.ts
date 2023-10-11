import { NEW_POPUP_CONTENT, POPUP_ON, POPUP_OFF } from './type';

const popupInitState = {
  image: null,
  title: '',
  paragraph: '',
  ctaBtn: '',
  currentProductId: null,
  popupController: false,
};
const popupReducer = (state = popupInitState, action: any) => {
  switch (action.type) {
    case NEW_POPUP_CONTENT:
      return {
        ...state,
        image: action.payload.image,
        title: action.payload.title,
        paragraph: action.payload.paragraph,
        ctaBtn: action.payload.ctaBtn,
        currentProductId: action.payload.currentProductId,
        popupController: action.payload.popupController,
      };
    case POPUP_OFF:
      return {
        ...state,
        popupController: false,
      };

    default:
      return state;
  }
};

export default popupReducer;
