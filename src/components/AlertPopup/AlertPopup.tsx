import React, { useEffect } from 'react';
import style from './AlertPopup.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { useNavigate } from 'react-router-dom';
import { popupOff } from '../../redux/alertPopup/action';
import { increasCartInventory } from '../../api/post';
import { IProductIdx } from '../../types/product';

const AlertPopup = () => {
  const popupData = useSelector((state: RootState) => state.popup);
  console.log('popupData 값', popupData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goLogin = () => {
    navigate('/login');
    dispatch(popupOff());
  };
  const closePopup = () => {
    dispatch(popupOff());
  };
  const nextCtaAction = () => {
    if (popupData.title === '로그인이 필요해요.') {
      goLogin();
    }
    if (popupData.title === '장바구니에 이미 담겨있는 상품입니다.') {
      const productId: IProductIdx = {
        productId: popupData.currentProductId,
      };
      console.log('장바구니 수량 추가');
      increasCartInventory(productId);
      closePopup();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={style['popup']}>
      <div className={style['popup__back']} onClick={closePopup}></div>
      <div className={style['popup__content-wrap']}>
        <img src={popupData.image} alt="" />
        <div className={style['popup__content']}>
          <h3>{popupData.title}</h3>
          <p>{popupData.paragraph}</p>
          <div className={style['popup__btn-wrap']}>
            <button
              className="general-btn--text block-btn"
              onClick={closePopup}
            >
              취소
            </button>
            <button className="cta-btn--block" onClick={nextCtaAction}>
              {popupData.ctaBtn}
            </button>
            {/* {popupData.title === '로그인이 필요해요.' ? (
              <button className="cta-btn--block" onClick={goLogin}>
                {popupData.ctaBtn}
              </button>
            ) : null}
            {popupData.title ===
            '장바구니에 이미 담겨있는 상품입니다.로그인이 필요해요.' ? (
              <button className="cta-btn--block" onClick={goLogin}>
                {popupData.ctaBtn}
              </button>
            ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPopup;
