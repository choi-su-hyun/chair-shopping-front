interface IPopupAction {
  type: string;
  payload: IPopupData;
}
interface IPopupData {
  image: string;
  title: string;
  paragraph: string;
  ctaBtn: string;
  currentProductId?: number | string;
  popupController: boolean;
}

export type { IPopupAction, IPopupData };
